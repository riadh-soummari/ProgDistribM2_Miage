# 1. Tirer les images Docker
- docker pull riadhsoummari/frontend_projet-miage:1.1
- docker pull riadhsoummari/backend_projet-miage:1.1

**minikube start**

# 2. Appliquer les fichier yaml
- kubectl apply -f deployment.yaml
- kubectl apply -f service.yaml
- kubectl apply -f front-deployment.yaml
- kubectl apply -f front-service.yaml

# 3. Vérifier les pods et les services
- kubectl get pods
- kubectl get service

# 4. Lancer les services
- minikube service recette-service
- minikube service recipes-front-service