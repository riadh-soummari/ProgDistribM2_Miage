# Site de Partage de Recettes

Bienvenue sur le Site de Partage de Recettes ! Cette application vous permet de découvrir, partager et créer vos propres recettes culinaires.

## Fonctionnalités

- **Authentification des utilisateurs**: Les utilisateurs peuvent créer un compte et se connecter pour accéder à toutes les fonctionnalités de l'application.
- **Gestion des recettes**: Les utilisateurs peuvent créer, éditer et supprimer leurs propres recettes.
- **Navigation des recettes**: Parcourez les recettes publiées par d'autres utilisateurs et consultez les détails de chaque recette.
- **Commentaires**: Laissez des commentaires sur les recettes pour partager vos impressions ou poser des questions aux créateurs.
**Recherche des recettes en ligne**: Parcourez une multitude de recettes en ligne à l'aide de l'api spoonacular.
- **Suggestion de recettes**: Utilisation de l'IA de pour proposer des recettes en fonction des ingrédients disponibles.
- **Génération d'images**: Création d'images appétissantes à partir des listes d'ingrédients et des recettes suggérées.

## Base de Données

Cette application utilise MongoDB pour stocker les données. Voici les collections utilisées :

- **Users**: Stocke les informations sur les utilisateurs.
- **Recipes**: Contient les détails des recettes consultées via l'api.
- **Comments**: Enregistre les commentaires laissés sur les recettes.
- **Publications**: Stocke les publications de recettes pour permettre la navigation.

## Démarrage
L'application sera accessible dans votre navigateur à l'adresse : http://localhost:3000
ou avec Postman,pour démarrer l'application localement, exécutez la commande suivante : 

```bash
npm install
npm start


