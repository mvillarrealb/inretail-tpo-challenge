resource "google_compute_global_address" "tpo_address" {
  name = "inretail-tpo-challenge-ip"
  description="I"
}
# Creación de la red privada
resource "google_compute_network" "private_network" {
  provider = google-beta
  name = "private-network"
}

# Creación de ips privadas
resource "google_compute_global_address" "private_ip_address" {
  provider = google-beta
  name          = "private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.private_network.self_link
}

# Creación de conección vpc(REVISAR PORFIS)
resource "google_service_networking_connection" "private_vpc_connection" {
  provider = google-beta
  network                 = google_compute_network.private_network.self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
}

# Instancia de cloud sql
resource "google_sql_database_instance" "pg_cloud_sql" {
  name             = "pg-cloud-sql"
  database_version = "POSTGRES_11"
  region           = "us-central1"
  depends_on = [google_service_networking_connection.private_vpc_connection]
  settings {
    tier = "db-f1-micro"
      ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.private_network.self_link
    }
  }
}
# Cluster de kubernetes
resource "google_container_cluster" "primary" {
  name               = "inretail-tpo-challenge-cluster"
  location           = "us-central1-a"
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
    machine_type = "n1-standard-1"
    
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
    }

    tags = ["dev", "qa", "prod", "mvillarreal", "inretail"]
  }

  timeouts {
    create = "30m"
    update = "40m"
  }
}

resource "google_dns_managed_zone" "challenge" {
  name     = "challenge-zone"
  dns_name = "challenge.mvillarreal.com."
}

resource "google_dns_record_set" "a_record" {
  name         = "backend.${google_dns_managed_zone.challenge.dns_name}"
  managed_zone = google_dns_managed_zone.challenge.name
  type         = "A"
  ttl          = 300
  
  rrdatas = ["${google_compute_global_address.tpo_address.address}"]
}

resource "google_dns_record_set" "cname_record" {
  name         = "frontend.${google_dns_managed_zone.challenge.dns_name}"
  managed_zone = google_dns_managed_zone.challenge.name
  type         = "CNAME"
  ttl          = 300
  rrdatas      = ["api.mvillarreal.com."]
}


