const apiUrl = '/api/posts.php';
let posts = [];
let currentCommentIndex = null;

const escapeHtml = (str) =>
  str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));

const renderBlogs = () => {
  const container = document.getElementById('blogList');
  container.innerHTML = '';
  posts.forEach((post, index) => {
    container.innerHTML += `
      <div class="blog-card">
        <div class="blog-header">
          <div class="blog-user">
            <img src="${escapeHtml(post.profile)}" alt="${escapeHtml(post.name)}">
            <div>
              <div 
                class="blog-name editable" 
                contenteditable="${post.isEditing}" 
                data-index="${index}" 
                data-type="name"
              >${escapeHtml(post.name)}</div>
            </div>
          </div>
          <button class="edit-btn" onclick="toggleEdit(${index})">
            ${post.isEditing ? 'Sauvegarder' : 'Modifier'}
          </button>
        </div>
        <p 
          class="blog-description editable" 
          contenteditable="${post.isEditing}" 
          data-index="${index}" 
          data-type="description"
        >${escapeHtml(post.description)}</p>
        <div class="blog-actions">
          <button class="btn" onclick="likePost(${index})">Like (${post.likes})</button>
          <button class="btn comment" onclick="openCommentModal(${index})">Commentaire (${post.comments})</button>
        </div>
      </div>
    `;
  });

  document.querySelectorAll('.editable').forEach((el) => {
    el.addEventListener('blur', handleSave);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        el.blur();
      }
    });
  });
};

const handleSave = (e) => {
  const el = e.target;
  const index = el.dataset.index;
  const type = el.dataset.type;
  const value = el.textContent.trim();
  posts[index][type] = value;
};

const toggleEdit = (index) => {
  const post = posts[index];
  if (post.isEditing) {
    fetch(`${apiUrl}/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: post.name,
        profile: post.profile,
        description: post.description
      })
    })
    .then(res => res.json())
    .then(() => {
      post.isEditing = false;
      renderBlogs();
    });
  } else {
    post.isEditing = true;
    renderBlogs();
    setTimeout(() => {
      document.querySelectorAll('.blog-description')[index].focus();
    }, 0);
  }
};

const likePost = (index) => {
  const post = posts[index];
  post.likes++;

  fetch(`${apiUrl}/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: post.name,
      profile: post.profile,
      description: post.description,
      likes: post.likes,
      comments: post.comments
    })
  }).then(() => renderBlogs());
};

const openCommentModal = (index) => {
  currentCommentIndex = index;
  document.getElementById("commentText").value = '';
  document.getElementById("commentModal").style.display = 'flex';
};

const openPostModal = () => {
  document.getElementById("postModal").style.display = 'flex';
};

const closeModal = () => {
  document.getElementById("commentModal").style.display = 'none';
  document.getElementById("postModal").style.display = 'none';
};

const submitComment = () => {
  const comment = document.getElementById("commentText").value.trim();
  if (comment) {
    const post = posts[currentCommentIndex];
    post.comments++;

    fetch(`${apiUrl}/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      name: post.name,
      profile: post.profile,
      description: post.description,
      likes: post.likes,
      comments: post.comments
      })
    }).then(() => {
      closeModal();
      renderBlogs();
      alert("Commentaire ajouté !");
    });
  }
};

const submitPost = () => {
  const desc = escapeHtml(document.getElementById("newDescription").value.trim());

  if (!desc) {
    return alert("Tous les champs sont requis.");
  }

  const newPost = { description: desc };

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  })
  .then(res => res.json())
  .then(() => {
    closeModal();
    loadPosts();
  })
  .catch(err => {
    alert("Erreur lors de la publication.");
    console.error(err);
  });
};

const loadPosts = () => {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      posts = data.map(post => ({
        ...post,
        isEditing: false
      }));
      renderBlogs();
    })
    .catch(err => console.error("Erreur lors du chargement des posts :", err));
};

window.onclick = (event) => {
  if (event.target.classList.contains('modal')) {
    closeModal();
  }
};

document.addEventListener('DOMContentLoaded', loadPosts);
