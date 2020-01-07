
provider "google" {
  credentials = "${file("service-account-key.json")}"
  project = "inretail-tpo-challenge"
  region="us-central1"
}
