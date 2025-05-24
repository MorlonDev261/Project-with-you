<?php
session_start();

$host = 'localhost';
$db = 'blogdb';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}


// Authentification nw mi géré user ign + champ (profile) ty juste exemple mi déclarer session fo.

$_SESSION['user_id'] = 42;
$_SESSION['username'] = 'JohnDoe';
$_SESSION['email'] = "morlonrandrianasolo@gmail.com";
$_SESSION['profile'] = 'https://goldenglobes.com/wp-content/uploads/2023/10/will-smith-c-hfpa-2016.jpg';




/** 

// Forme base de donnée nampiasaign f adapter am ninw ign

-- Crée la base de données
CREATE DATABASE IF NOT EXISTS blogdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Utilise la base
USE blogdb;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  profile VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des posts
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  likes INT DEFAULT 0,
  userId INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE SET NULL
);

-- Table des commentaires
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

**/

?>
