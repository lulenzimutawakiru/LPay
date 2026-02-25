output "eks_cluster_name" { value = aws_eks_cluster.main.name }
output "eks_endpoint" { value = aws_eks_cluster.main.endpoint }
output "postgres_endpoint" { value = aws_db_instance.postgres.address }
