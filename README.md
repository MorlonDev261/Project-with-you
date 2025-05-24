# Blog API Project

Ce projet est une application simple de blog avec une API RESTful en PHP et une interface utilisateur minimaliste.

## Structure du projet

```
/blog-api-project
│
├── api/
│   └── posts.php          ← Point d’entrée de l’API (GET, POST, PUT, DELETE)
│
├── includes/
│   └── db.php             ← Connexion PDO à la base de données
│
├── index.php              ← Interface utilisateur (HTML + PHP)
│   ├── css/
│   │   └── style.css      ← Fichier CSS pour le style de l’interface
│   └── js/
│       └── app.js         ← Script JavaScript pour les interactions côté client
│
├── .htaccess              ← Fichier pour router les requêtes API et sécuriser l'application
└── README.md              ← Ce fichier
```

## Fonctionnalités

- Affichage des posts
- Ajout de nouveaux posts
- Mise à jour et suppression de posts
- Commentaires (en local pour le moment)
- Système de like
- Authentification basique via session PHP

## API Endpoints (`/api/posts.php`)

- `GET /api/posts` : Récupère tous les posts
- `GET /api/posts/{id}` : Récupère un post spécifique
- `POST /api/posts` : Crée un nouveau post (requiert `name`, `profile`, `description`)
- `PUT /api/posts/{id}` : Met à jour un post
- `DELETE /api/posts/{id}` : Supprime un post

## Sécurité

- Utilisation de sessions PHP pour gérer l’utilisateur
- Filtres et validations sur les entrées utilisateurs (`htmlspecialchars`, `filter_var`, etc.)
- `.htaccess` peut être utilisé pour :
  - Restreindre l’accès direct à certains fichiers
  - Rediriger les requêtes vers l’API proprement
  - Éviter certaines attaques basiques (ex : accès aux fichiers sensibles)

Exemple de `.htaccess` minimal :

```apacheconf
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^api/(.*)$ api/posts.php [QSA,L]
</IfModule>

# Sécurité de base
<FilesMatch "\.(htaccess|env|db\.php|sql)$">
  Order Allow,Deny
  Deny from all
</FilesMatch>
```

## Installation

1. Cloner le repo :
   ```bash
   git clone https://github.com/votre-utilisateur/blog-api-project.git
   cd blog-api-project
   ```

2. Créer la base de données et la table `posts` :

```sql
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  profile TEXT NOT NULL,
  description TEXT NOT NULL,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Configurer `includes/db.php` avec vos identifiants MySQL.

4. Lancer l’application sur un serveur local (ex: XAMPP, Laragon).

## À faire

- Ajouter un système d’authentification sécurisé
- Stocker les commentaires dans une table dédiée
- Ajouter une pagination dans l’API
- Protéger les endpoints (CSRF, Auth, etc.)

---

**Auteur** : [Votre Nom]  
**Licence** : MIT
