# Get domains hosted zone (created automatically when domain is purchased via route 53)
data "aws_route53_zone" "current_zone" {
  name         = var.domain_name
  private_zone = false
}

# Create 'A' record that directs traffic for example.com to cloudfront distribution
resource "aws_route53_record" "root" {
  zone_id = data.aws_route53_zone.current_zone.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cloudfront_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.cloudfront_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# Create 'A' record that directs traffic for www.example.com to cloudfront distribution
resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.current_zone.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cloudfront_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.cloudfront_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}