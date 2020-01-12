provider "google" {
  credentials = "${file("service-account-key.json")}"
  project     = "${var.gcp_project}"
  region      = "${var.gcp_region}"
}

provider "google-beta" {
  credentials = "${file("service-account-key.json")}"
  project     = "${var.gcp_project}"
  region      = "${var.gcp_region}"
}


# Ip estática global
resource "google_compute_global_address" "tpo_address" {
  name = "inretail-tpo-challenge-ip"
}

# VPC privada
resource "google_compute_network" "private_network" {
  provider     = "google-beta"
  name         = "private-network"
  routing_mode = "REGIONAL"
}

# Creación de ip privadas
resource "google_compute_global_address" "private_ip_address" {
  provider      = "google-beta"
  name          = "private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.private_network.self_link
}

resource "google_service_networking_connection" "private_vpc_connection" {
  provider = google-beta
  network                 = google_compute_network.private_network.self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
}

# Instancia de cloud sql
resource "google_sql_database_instance" "mysql_cloud_sql" {
  provider    = google-beta
  name        = "inretail-tpo-challenge-database"
  depends_on  = [google_service_networking_connection.private_vpc_connection]
  
  settings {
    tier = "db-f1-micro"
    user_labels = {
      app = "inretail-tpo-challenge"
      environment="test"
      tier = "database"
    }

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.private_network.self_link
    }
  }
}

# Cluster de kubernetes
resource "google_container_cluster" "container_cluster" {
  name               = "inretail-tpo-challenge-cluster"
  location           = "${var.gcp_zone}"
  initial_node_count = 2

  master_auth {
    username = ""
    password = ""

    client_certificate_config {
      issue_client_certificate = false
    }
  }
  network = google_compute_network.private_network.self_link

  logging_service = "logging.googleapis.com/kubernetes"

  node_config {
    machine_type = "${var.gke_machine_type}"
    
    oauth_scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write"
    ]

    metadata = {
      disable-legacy-endpoints = "true"
    }

    labels = {
      app = "inretail-tpo-challenge"
      environment="test"
      tier="container-runtime"
    }

    tags = ["dev", "qa", "prod", "mvillarreal", "inretail"]
  }

  timeouts {
    create = "30m"
    update = "40m"
  }
}

# Zona de DNS
resource "google_dns_managed_zone" "dns_zone" {
  name     = "inretail-tpo-challenge-zone"
  dns_name = "challenge.mvillarreal.com."
}

# Registro A de DNS
resource "google_dns_record_set" "a_record" {
  name         = "backend.${google_dns_managed_zone.dns_zone.dns_name}"
  managed_zone = google_dns_managed_zone.dns_zone.name
  type         = "A"
  ttl          = 300
  
  rrdatas = ["${google_compute_global_address.tpo_address.address}"]
}

# Registro CNAME de DNS
resource "google_dns_record_set" "cname_record" {
  name         = "frontend.${google_dns_managed_zone.dns_zone.dns_name}"
  managed_zone = google_dns_managed_zone.dns_zone.name
  type         = "CNAME"
  ttl          = 300
  rrdatas      = ["api.mvillarreal.com."]
}


