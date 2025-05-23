const data = [
      {
        id: 1,
        profile: 'https://randomuser.me/api/portraits/men/11.jpg',
        name: 'Jean Dupont',
        description: 'Voici mon premier article sur le blog. Merci de lire !',
        likes: 0,
        comments: 0,
        isEditing: false
      },
      {
        id: 2,
        profile: 'https://randomuser.me/api/portraits/women/25.jpg',
        name: 'Claire Bernard',
        description: 'J’adore partager mes pensées ici, et vous ?',
        likes: 0,
        comments: 0,
        isEditing: false
      }
    ];

    let currentCommentIndex = null;

    const renderBlogs = () => {
      const container = document.getElementById('blogList');
      container.innerHTML = '';
      data.forEach((post, index) => {
        container.innerHTML += `
          <div class="blog-card">
            <div class="blog-header">
              <div class="blog-user">
                <img src="${post.profile}" alt="${post.name}">
                <div>
                  <div 
                    class="blog-name editable" 
                    contenteditable="${post.isEditing}"
                    onblur="saveName(${index}, this)"
                    onkeydown="handleEnter(event)"
                  >${post.name}</div>
                </div>
              </div>
              <button class="edit-btn" onclick="toggleEdit(${index})">
                ${post.isEditing ? 'Sauvegarder' : 'Modifier'}
              </button>
            </div>
            <p 
              class="blog-description editable"
              contenteditable="${post.isEditing}"
              onblur="saveDescription(${index}, this)"
              onkeydown="handleEnter(event)"
            >${post.description}</p>
            <div class="blog-actions">
              <button class="btn" onclick="likePost(${index})">Like (${post.likes})</button>
              <button class="btn comment" onclick="openModal(${index})">Commentaire (${post.comments})</button>
            </div>
          </div>
        `;
      });
    };

    const toggleEdit = (index) => {
      const post = data[index];
      if (post.isEditing) {
        const blogCard = document.querySelectorAll('.blog-card')[index];
        post.name = blogCard.querySelector('.blog-name').textContent.trim();
        post.description = blogCard.querySelector('.blog-description').textContent.trim();
      }

      post.isEditing = !post.isEditing;
      renderBlogs();

      if (post.isEditing) {
        setTimeout(() => {
          const blogCard = document.querySelectorAll('.blog-card')[index];
          const descEl = blogCard.querySelector('.blog-description');
          descEl.focus();
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(descEl);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }, 0);
      }
    };

    const saveName = (index, el) => {
      data[index].name = el.textContent.trim();
    };

    const saveDescription = (index, el) => {
      data[index].description = el.textContent.trim();
    };

    const handleEnter = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.target.blur();
      }
    };

    const likePost = (index) => {
      data[index].likes++;
      renderBlogs();
    };

    const openModal = (index) => {
      currentCommentIndex = index;
      document.getElementById("commentText").value = '';
      document.getElementById("commentModal").style.display = 'flex';
    };

    const closeModal = () => {
      document.getElementById("commentModal").style.display = 'none';
    };

    const submitComment = () => {
      const comment = document.getElementById("commentText").value.trim();
      if (comment) {
        data[currentCommentIndex].comments++;
        closeModal();
        renderBlogs();
        alert("Commentaire ajouté !");
      }
    };

    window.onclick = (event) => {
      const modal = document.getElementById("commentModal");
      if (event.target === modal) {
        closeModal();
      }
    };

    renderBlogs();
