# Create ECR repository (container repository)
resource "aws_ecr_repository" "ecr_repository" {
  name                 = "seafood-app"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }
}