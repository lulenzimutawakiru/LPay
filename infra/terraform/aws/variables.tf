variable "aws_region" {
	type    = string
	default = "af-south-1"
}

variable "vpc_cidr" {
	type    = string
	default = "10.80.0.0/16"
}

variable "availability_zones" {
	type    = list(string)
	default = ["af-south-1a", "af-south-1b", "af-south-1c"]
}

variable "cluster_name" {
	type    = string
	default = "lpay-eks-prod"
}

variable "kubernetes_version" {
	type    = string
	default = "1.31"
}

variable "db_name" {
	type    = string
	default = "lpay_prod"
}

variable "db_username" {
	type    = string
	default = "lpay_app"
}

variable "db_password" {
	type      = string
	sensitive = true
}
