resource "google_compute_address" "ip_address" {
  name = "inretail-tpo-challenge-ip"
}

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

  node_config {
    machine_type = "n1-standard-1"
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
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