# Intercorp retail TPO CHALLENGE

# General

# Componentes

Componente| Descripción|Tecnología
---|---|---
customers-api| Api de clientes|Spring Boot
customers-web| Front end de clientes|Angular
customers-openapi| Documentación swagger|Open api 3
platform| Plataforma |Terraform & GCP

# Instalación

## Plataforma GCP

```sh
gcloud projects list

gcloud projects create mvillarreal-tpo-challenge

gcloud config set project mvillarreal-tpo-challenge

# Habilita la api de kubernetes para el projecto(debe haber billing account asociada)
gcloud services enable container.googleapis.com

# Habilita la api de container registry para el projecto(debe haber billing account asociada)
gcloud services enable containerregistry.googleapis.com

# Creación del service account para terraform
gcloud iam service-accounts create inretail-tpo-saccount \
    --description "Main service account for terraform" \
    --display-name "inretail-tpo-service-account"


# Asignar rol editor al service account(revisar comando)
gcloud projects add-iam-policy-binding mvillarreal-tpo-challenge \
  --member serviceAccount:inretail-tpo-saccount@mvillarreal-tpo-challenge.iam.gserviceaccount.com \
  --role roles/editor


# Exportar el key para terraform
gcloud iam service-accounts keys create $(pwd)/platform/service-account-key.json \
  --iam-account inretail-tpo-saccount@mvillarreal-tpo-challenge.iam.gserviceaccount.com



#Init terraform plugins
terraform init

# Ver el plan de terraform(antes de ejecutar)
terraform plan

#Que comience la fiesta!
terraform apply

# Crear el secret para los deploy tengan permiso de hacer pull al registry gcr.io
kubectl create secret docker-registry gcr-json-key \
--docker-server=gcr.io \
--docker-username=_json_key \
--docker-password="$(cat $(pwd)/platform/service-account-key.json)" \
--docker-email=erick.slayer.m.v@gmail.com \
-n apps
```

## Microservicio customer-api

Se despliega usando el job en el directorio .github

## Frontend App

Se despliega usando firebase cli

## Test de la Api

```sh
npm install -g newman
cd ./customers-api && newman run customer-api.postman_collection.json

```