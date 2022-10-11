# Get docker image data
data "aws_ecr_image" "api_image" {
  repository_name = "seafood-app"
  image_tag       = "latest"
}

# Create ECS cluster
resource "aws_ecs_cluster" "fargate_ecs_cluster" {
  name = "seafood-app"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# Create ECS cluster capacity provider (AWS Fargate)
resource "aws_ecs_cluster_capacity_providers" "fargate_ecs_cluster_capacity_provider" {
  cluster_name = aws_ecs_cluster.fargate_ecs_cluster.name

  capacity_providers = ["FARGATE"]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = "FARGATE"
  }
}

# Create ECS Service
resource "aws_ecs_service" "api" {
  name            = "seafood-app"
  cluster         = aws_ecs_cluster.fargate_ecs_cluster.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 1


  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "seafood-app"
    container_port   = "${var.port}"
  }

  network_configuration {
    subnets = [for subnet in module.vpc.private_subnets : subnet]
    security_groups = [aws_security_group.ecs_security_group.id]

  }

  deployment_circuit_breaker {
    enable = true
    rollback = true
  }
}

# Create ECS task definition
resource "aws_ecs_task_definition" "api" {
  family                   = "seafood-app"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = aws_iam_role.api_execution_role.arn
  container_definitions    = jsonencode(
    [
      {
        "name" : "seafood-app",
        "image" : "120545966579.dkr.ecr.us-east-1.amazonaws.com/seafood-app:latest",
        "cpu" : 1024
        "memory" : 2048
        "portMappings" : [
          {
            "containerPort" = "${var.port}"
          }
        ]
        "logConfiguration" : {
          logDriver = "awslogs"
          options = {
            awslogs-group = "seafood-app"
            awslogs-region = "${var.region}"
            awslogs-stream-prefix = "api-logs"
          }
        }

        "environment" : [
          { "name" : "DB_URL" , "value" : "mongodb+srv://seafood-app-mongo-account:5jjzhnHbsK5V6pHe@seafood-app.is4th.mongodb.net/?retryWrites=true&w=majority" },
          { "name" : "DB_NAME" , "value" : "seafood-app" },
          { "name" : "HOST_ADDRESS",  "value" : "localhost" },
          { "name" : "PORT",  "value" : "3001" },
        ]
      }
    ]
  )

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "ARM64"
  }
}

# Allow ECS service to pull containers from ECR registry and write logs to cloudwatch
resource "aws_iam_role" "api_execution_role" {
  name = "seafood-app"
  assume_role_policy = jsonencode(
    {
      "Version" : "2008-10-17",
      "Statement" : [
        {
          "Action" : "sts:AssumeRole"
          "Effect" : "Allow"
          "Principal" : {
            "Service" : ["ecs.amazonaws.com", "ecs-tasks.amazonaws.com"]
          }
        }
      ]
    }
  )
}

# Create IAM policy
resource "aws_iam_policy" "api_policy" {
  name   = "seafood-app"
  path   =  "/"
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : "ecr:*"
          "Effect" : "Allow"
          "Resource" : "*"
        },
        {
          "Action" : "logs:*"
          "Effect" : "Allow"
          "Resource" : "*"
        }
      ]
    }
  )
}

# Attach policy to IAM role
resource "aws_iam_role_policy_attachment" "api_policy_attachment" {
  role = aws_iam_role.api_execution_role.name
  policy_arn = aws_iam_policy.api_policy.arn
}

# Create ECS security group that only allows traffic from the API ALB security group
resource "aws_security_group" "ecs_security_group" {
  name        = "seafood-app-api"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    security_groups  = [aws_security_group.alb_security_group.id]
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

# Create cloudwatch log group
resource "aws_cloudwatch_log_group" "api_log_group" {
  name = "seafood-app"
}


