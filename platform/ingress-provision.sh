# Crea service account tiller para helm
kubectl create serviceaccount -n kube-system tiller

# Crea cluster role binding para tiller
kubectl create clusterrolebinding tiller-binding \
    --clusterrole=cluster-admin \
    --serviceaccount kube-system:tiller

# Inicializa el helm con el service account
helm init --service-account tiller

# Actualización de repos de helm
helm repo update

# Instalación del cert-manager
helm install --name cert-manager --version v0.5.2 \
    --namespace kube-system stable/cert-manager


export EMAIL=erick.slayer.m.v@gmail.com

# Creación del cert issuer de letsencrypt
curl -sSL https://rawgit.com/ahmetb/gke-letsencrypt/master/yaml/letsencrypt-issuer.yaml | \
    sed -e "s/email: ''/email: $EMAIL/g" | \
    kubectl apply -f-