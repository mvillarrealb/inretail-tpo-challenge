# Intercorp retail TPO CHALLENGE

# General

# Componentes

Componente| Descripción|Tecnología
---|---|---
customers-api| |Spring Boot
customers-web| |Angular
customers-openapi| |Open api 3
platform| |Terraform & GCP

# Instalación

## Plataforma GCP

```sh
gcloud projects list

gcloud projects create inretail-tpo-challenge

gcloud config set project inretail-tpo-challenge

# Creación del service account para terraform
gcloud iam service-accounts create inretail-tpo-saccount \
    --description "Main service account for terraform" \
    --display-name "inretail-tpo-service-account"


# Asignar rol editor al service account(revisar comando)
gcloud projects add-iam-policy-binding inretail-tpo-saccount \
  --member serviceAccount:inretail-tpo-saccount@inretail-tpo-challenge.iam.gserviceaccount.com \
  --role roles/editor


# Exportar el key para terraform
gcloud iam service-accounts keys create ${PWD}/platform/service-account-key.json \
  --iam-account inretail-tpo-saccount@inretail-tpo-challenge.iam.gserviceaccount.com

# Habilita la api de kubernetes para el projecto(debe haber billing account asociada)
gcloud services enable container.googleapis.com

# Habilita la api de container registry para el projecto(debe haber billing account asociada)
gcloud services enable containerregistry.googleapis.com

#Init terraform plugins
terraform init

# Ver el plan de terraform(antes de ejecutar)
terraform plan

#Que comience la fiesta!
terraform apply
```
## Documentación Open Api

```sh
kubectl apply -f customers-openapi/deploy -n demo
```
## Microservicio customer-api

### Despliegue automatizado

### Despliegue Manual
```sh
cd customers-api & ./mvnw clean package

docker build -t micro-service-demo:1.0.0 .

docker tag micro-service-demo:1.0.0

docker push

sed -i 's/image-version/micro-service-demo:1.0.0/g' deploy/deployment.yml

kubectl apply -f deploy -n demo
```

## Frontend App

# Testing