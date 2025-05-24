<?php
session_start();

header('Content-Type: application/json');
require_once '../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$parts = explode('/', trim($path, '/'));
$id = $parts[2] ?? null;

switch ($method) {
    case 'GET':
        $id ? getPost($id) : getAllPosts();
        break;
    case 'POST':
        createPost();
        break;
    case 'PUT':
        $id ? updatePost($id) : error405();
        break;
    case 'DELETE':
        $id ? deletePost($id) : error405();
        break;
    default:
        error405();
}

function getAllPosts() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM posts ORDER BY created_at DESC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

function getPost($id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM posts WHERE id = ?");
    $stmt->execute([$id]);
    $post = $stmt->fetch(PDO::FETCH_ASSOC);
    $post ? print json_encode($post) : error404();
}

function createPost() {
    global $pdo;
    
    $name = $_SESSION['username'];
    $profile = $_SESSION['profile'];
    
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($name) || empty($profile) || empty($data['description'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Champs requis manquants']);
        return;
    }

    $stmt = $pdo->prepare("INSERT INTO posts (name, profile, description, likes, comments) VALUES (?, ?, ?, 0, 0)");
    $stmt->execute([
        htmlspecialchars($name),
        filter_var($profile, FILTER_SANITIZE_URL),
        htmlspecialchars($data['description'])
    ]);

    echo json_encode([
        'message' => 'Post créé',
        'id' => $pdo->lastInsertId()
    ]);
}

function updatePost($id) {
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['name']) || empty($data['profile']) || empty($data['description'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Champs requis manquants']);
        return;
    }

    $likes = isset($data['likes']) ? (int)$data['likes'] : 0;
    $comments = isset($data['comments']) ? (int)$data['comments'] : 0;

    $stmt = $pdo->prepare("UPDATE posts SET name = ?, profile = ?, description = ?, likes = ?, comments = ? WHERE id = ?");
    $stmt->execute([
        htmlspecialchars($data['name']),
        filter_var($data['profile'], FILTER_SANITIZE_URL),
        htmlspecialchars($data['description']),
        $likes,
        $comments,
        $id
    ]);

    echo json_encode(['message' => 'Post mis à jour']);
}

function deletePost($id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM posts WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(['message' => 'Post supprimé']);
}

function error404() {
    http_response_code(404);
    echo json_encode(['error' => 'Non trouvé']);
}

function error405() {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
}
?>
