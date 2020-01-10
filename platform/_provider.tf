
provider "google" {
  credentials = "${file("service-account-key.json")}"
  project = "mvillarreal-tpo-challenge"
  region="us-central1"
}

provider "google-beta" {
  credentials = "${file("service-account-key.json")}"
  project = "mvillarreal-tpo-challenge"
  region="us-central1"
}

