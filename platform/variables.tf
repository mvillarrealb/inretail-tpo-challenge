# Región del proyecto
variable "gcp_region" {
  description = "GCP region, e.g. us-east1"
  default = "us-central1"
}

# Zona del proyecto
variable "gcp_zone" {
  description = "GCP zone, e.g. us-east1-b (which must be in gcp_region)"
  default = "us-central1-a"
}

# Proyecto GCP
variable "gcp_project" {
  description = "GCP project name"
  default = "mvillarreal-tpo-challenge"
}

# Tipo de maquina del cluster de kubernetes
variable "gke_machine_type" {
    description = "GKE machine flavor"
    default     = "n1-standard-1"
}