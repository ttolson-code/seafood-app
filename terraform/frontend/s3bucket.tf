# Create s3 bucket to host frontend
resource "aws_s3_bucket" "root_bucket" {
  bucket        = var.domain_name
  force_destroy = true
}

# Set s3 bucket ACl to private
resource "aws_s3_bucket_acl" "root_bucket_acl" {
  bucket = aws_s3_bucket.root_bucket.id
  acl    = "private"
}

# Create s3 bucket policy that allows cloudfront to get objects from bucket
resource "aws_s3_bucket_policy" "root_bucket_access_policy" {
  bucket = aws_s3_bucket.root_bucket.id
  policy = jsonencode(
    {
      "Version" : "2008-10-17",
      "Id" : "PolicyForCloudFrontPrivateContent",
      "Statement" : [
        {
          "Sid" : "AllowCloudFrontServicePrincipal",
          "Effect" : "Allow",
          "Principal" : {
            "Service" : "cloudfront.amazonaws.com"
          },
          "Action" : "s3:GetObject",
          "Resource" : "arn:aws:s3:::${var.domain_name}/*",
          "Condition" : {
            "StringEquals" : {
              "AWS:SourceArn" : aws_cloudfront_distribution.cloudfront_distribution.arn
            }
          }
        }
      ]
    }
  )
}