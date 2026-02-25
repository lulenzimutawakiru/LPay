param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("aws", "azure")]
  [string]$Cloud,

  [Parameter(Mandatory = $false)]
  [ValidateSet("plan", "apply")]
  [string]$Action = "plan",

  [Parameter(Mandatory = $false)]
  [string]$Environment = "prod"
)

$ErrorActionPreference = "Stop"

function Require-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command '$Name' is not installed or not in PATH."
  }
}

Require-Command terraform

$Root = Split-Path -Parent $PSScriptRoot
$TfDir = Join-Path $Root "infra/terraform/$Cloud"
$TfVars = Join-Path $TfDir "env/$Environment.tfvars"

if (-not (Test-Path $TfDir)) {
  throw "Terraform directory not found: $TfDir"
}

if (-not (Test-Path $TfVars)) {
  throw "Missing tfvars file: $TfVars. Create it from env/$Environment.tfvars.example"
}

terraform -chdir="$TfDir" init
terraform -chdir="$TfDir" validate

if ($Action -eq "plan") {
  terraform -chdir="$TfDir" plan -var-file="env/$Environment.tfvars" -out="tfplan"
}

if ($Action -eq "apply") {
  terraform -chdir="$TfDir" apply -var-file="env/$Environment.tfvars" -auto-approve
}
