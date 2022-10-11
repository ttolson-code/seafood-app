# Get ACM Certificate
data "aws_acm_certificate" "cert" {
  domain   = "${var.domain_name}"
  statuses = ["ISSUED"]
}

# Create Application Load Balancer
resource "aws_lb" "api" {
  name               = "seafood-app"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_security_group.id]
  subnets            = [for subnet in module.vpc.public_subnets : subnet]

  enable_deletion_protection = false

  tags = {
    Terraform = "true"
    Environment = "seafood-app"
  }
}


# Create application load balancer target group
resource "aws_lb_target_group" "api" {
  name     = "seafood-app"
  port     = "${var.port}"
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id
  target_type = "ip"

  health_check {
    path = "/"
    port = "${var.port}"
  }
}

# Create application load balancer listener
resource "aws_lb_listener" "api" {
  load_balancer_arn = aws_lb.api.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = data.aws_acm_certificate.cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
}

# Create application load balancer security group
resource "aws_security_group" "alb_security_group" {
  name        = "seafood-app"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description      = "TLS from VPC"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  ingress {
    description      = "TLS from VPC"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Terraform = "true"
    Environment = "seafood-app"
  }
}

# Get route 53 hosted zone
data "aws_route53_zone" "current_zone" {
  name         = var.domain_name
  private_zone = false
}

# Get application load balancer hosted zone
data "aws_lb_hosted_zone_id" "alb_hosted_zone" {}

# Create route 53 record that points api.example.com to API application load balancer
resource "aws_route53_record" "api_alb_record" {
  zone_id = data.aws_route53_zone.current_zone.zone_id
  name    = "api.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.api.dns_name
    zone_id                = data.aws_lb_hosted_zone_id.alb_hosted_zone.id
    evaluate_target_health = false
  }
}