# Create cloudfront distribution
resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  aliases             = ["*.${var.domain_name}", "${var.domain_name}", "www.${var.domain_name}"]
  enabled             = true // Required
  default_root_object = "index.html"

  origin { // Required
    domain_name = aws_s3_bucket.root_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.root_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront_distribution_origin_access_control.id
  }

  default_cache_behavior { // Required
    viewer_protocol_policy = "redirect-to-https"                                   // Required
    allowed_methods        = ["GET", "HEAD"]                                       // Required
    cached_methods         = ["GET", "HEAD"]                                       // Required
    target_origin_id       = aws_s3_bucket.root_bucket.bucket_regional_domain_name // Required

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {  // Optional - used when hosting react apps in s3
    error_code = 403
    response_page_path = "/index.html"
    response_code = 200

  }

  restrictions { // Required
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE"]
    }
  }

  viewer_certificate { // Required
    cloudfront_default_certificate = false
    acm_certificate_arn            = aws_acm_certificate.cert.arn
    ssl_support_method             = "sni-only"
  }
}

# Configure cloudfront origin access control
resource "aws_cloudfront_origin_access_control" "cloudfront_distribution_origin_access_control" {
  name                              = aws_s3_bucket.root_bucket.bucket_regional_domain_name
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}