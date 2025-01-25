Write-Host "Initialisation du déploiement..."

# Étape 1 : Demande du nom d'utilisateur Docker Hub
$dockerhub_user = Read-Host "Entrez votre nom d'utilisateur Docker Hub"

# Étape 2 : Construction et push de l'image Docker
Write-Host "Construction de l'image Docker..."
docker build -t "$dockerhub_user/recette-app:latest" .
docker push "$dockerhub_user/recette-app:latest"

# Étape 3 : Démarrage de Minikube
Write-Host "Démarrage de Minikube..."
minikube start

# Activer l'Ingress sur Minikube
Write-Host "Activation de l'Ingress..."
minikube addons enable ingress

# Étape 4 : Mise à jour des fichiers YAML
Write-Host "Mise à jour des fichiers Kubernetes..."
(Get-Content deployment.yaml) -replace "votre-dockerhub-user", $dockerhub_user | Set-Content deployment.yaml

# Étape 5 : Déploiement des fichiers Kubernetes
Write-Host "Application des fichiers Kubernetes..."
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml

Write-Host "Déploiement terminé. Accédez à votre application via l'adresse suivante :"
Write-Host (minikube ip)
