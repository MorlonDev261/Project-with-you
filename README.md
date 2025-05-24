# Project-with-you

# Blog API Project

Ce projet est une application simple de blog avec une API RESTful en PHP et une interface utilisateur minimaliste.

## Structure du projet

```
/blog-api-project
â”‚
â”œâ”€â”€ api/
â”‚   â””â”€â”€ posts.php          â† Point dâ€™entrÃ©e de lâ€™API (GET, POST, PUT, DELETE)
â”‚
â”œâ”€â”€ includes/
â”‚   â””â”€â”€ db.php             â† Connexion PDO Ã  la base de donnÃ©es
â”‚
â”œâ”€â”€ index.php              â† Interface utilisateur (HTML + PHP)
â”‚   â”œâ”€â”€ css/
â”‚   â”‚   â””â”€â”€ style.css      â† Fichier CSS pour le style de lâ€™interface
â”‚   â””â”€â”€ js/
â”‚       â””â”€â”€ app.js         â† Script JavaScript pour les interactions cÃ´tÃ© client
â”‚
â”œâ”€â”€ .htaccess              â† Fichier pour router les requÃªtes API et sÃ©curiser l'application
â””â”€â”€ README.md              â† Ce fichier
```

## FonctionnalitÃ©s

- Affichage des posts
- Ajout de nouveaux posts
- Mise Ã  jour et suppression de posts
- Commentaires (en local pour le moment)
- SystÃ¨me de like
- Authentification basique via session PHP

## API Endpoints (`/api/posts.php`)

- `GET /api/posts` : RÃ©cupÃ¨re tous les posts
- `GET /api/posts/{id}` : RÃ©cupÃ¨re un post spÃ©cifique
- `POST /api/posts` : CrÃ©e un nouveau post (requiert `name`, `profile`, `description`)
- `PUT /api/posts/{id}` : Met Ã  jour un post
- `DELETE /api/posts/{id}` : Supprime un post

## SÃ©curitÃ©

- Utilisation de sessions PHP pour gÃ©rer lâ€™utilisateur
- Filtres et validations sur les entrÃ©es utilisateurs (`htmlspecialchars`, `filter_var`, etc.)
- `.htaccess` peut Ãªtre utilisÃ© pour :
  - Restreindre lâ€™accÃ¨s direct Ã  certains fichiers
  - Rediriger les requÃªtes vers lâ€™API proprement
  - Ã‰viter certaines attaques basiques (ex : accÃ¨s aux fichiers sensibles)

Exemple de `.htaccess` minimal :

```apacheconf
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^api/(.*)$ api/posts.php [QSA,L]
</IfModule>

# SÃ©curitÃ© de base
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

2. CrÃ©er la base de donnÃ©es et la table `posts` :

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

4. Lancer lâ€™application sur un serveur local (ex: XAMPP, Laragon).

## Ã€ faire

- Ajouter un systÃ¨me dâ€™authentification sÃ©curisÃ©
- Stocker les commentaires dans une table dÃ©diÃ©e
- Ajouter une pagination dans lâ€™API
- ProtÃ©ger les endpoints (CSRF, Auth, etc.)

---

**Auteur** : [Morlon Dev]  
**Licence** : MIT
