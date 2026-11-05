# API REST Checkpoint

API REST Node.js avec Express et MongoDB/Mongoose pour gérer des utilisateurs.

## Installation

Depuis le dossier du projet, installez les dépendances :

```powershell
npm.cmd install
```

Créez un fichier `.env` à partir de `.env.example`, puis remplacez les valeurs
par celles de votre cluster MongoDB Atlas. Ne partagez pas et ne committez pas
ce fichier : il contient vos identifiants de connexion.

## Démarrage

Mode développement (redémarrage automatique lors des modifications) :

```powershell
npm.cmd run dev
```

Le serveur démarre sur le port défini par `PORT` (5000 par défaut), après la
connexion à MongoDB.

## Routes

Toutes les routes utilisent `http://localhost:5000` par défaut.

| Méthode | Chemin | Description |
| --- | --- | --- |
| GET | `/` | Vérifie que l'API répond |
| GET | `/users` | Récupère tous les utilisateurs |
| POST | `/users` | Crée un utilisateur |
| PUT | `/users/:id` | Modifie un utilisateur |
| DELETE | `/users/:id` | Supprime un utilisateur |

Pour créer ou modifier un utilisateur, envoyez un corps JSON. Exemple :

```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "age": 25
}
```
