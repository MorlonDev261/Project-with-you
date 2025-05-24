<?php session_start(); ?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Professionnel</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="header">
    <h2>Mon Blog</h2>
    <button class="btn post" onclick="openPostModal()">Ajouter un blog</button>
  </header>

  <div class="blog-container" id="blogList"></div>

  <!-- MODAL AJOUT POST -->
  <div class="modal" id="postModal">
    <div class="modal-content">
      <span class="btn-close" onclick="closeModal()" aria-label="Fermer">&times;</span>        
      <div class="blog-user">
 <img src="<?= $_SESSION['profile'] ?>" alt="<?= $_SESSION['username'] ?>">
            <div>
               <div class="blog-name"><?= $_SESSION['username'] ?></div>
            </div>        
           </div>
      <h3 class="p-5">Ajouter un blog</h3>
      <textarea id="newDescription" placeholder="Description..." aria-label="Description du blog"></textarea>
      <div class="modal-buttons">
        <button onclick="submitPost()" class="btn">Publier</button>
      </div>
    </div>
  </div>

  <!-- MODAL COMMENTAIRE -->
  <div class="modal" id="commentModal">
    <div class="modal-content">
      <span class="btn-close" onclick="closeModal()" aria-label="Fermer">&times;</span>
      <h3>Laissez un commentaire</h3>
      <textarea id="commentText" placeholder="Votre commentaire..." aria-label="Commentaire"></textarea>
      <div class="modal-buttons">
        <button onclick="submitComment()" class="btn comment">Envoyer</button>
      </div>
    </div>
  </div>

  <script src="js/app.js"></script>
</body>
</html>
