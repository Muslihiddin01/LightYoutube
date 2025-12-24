const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const addPost = document.getElementById("addPost");
const postsContainer = document.getElementById("postsContainer");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Рендер
function renderPosts() {
  postsContainer.innerHTML = "";

  posts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "card";

    if (post.type === "video") {
      card.innerHTML = `
        <video controls src="${post.data}"></video>
        <div class="card-content">
          <h3>${post.title}</h3>
          <button onclick="deletePost(${index})">Удалить</button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <img src="${post.data}" />
        <div class="card-content">
          <h3>${post.title}</h3>
          <button onclick="deletePost(${index})">Удалить</button>
        </div>
      `;
    }

    postsContainer.appendChild(card);
  });

  localStorage.setItem("posts", JSON.stringify(posts));
}

// Добавление поста
addPost.onclick = () => {
  const title = document.getElementById("title").value;
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!title || !file) {
    alert("Заполни название и выбери файл");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const postType = file.type.startsWith("video") ? "video" : "image";

    posts.push({
      title,
      type: postType,
      data: reader.result
    });

    renderPosts();
    modal.classList.add("hidden");
    fileInput.value = "";
  };

  reader.readAsDataURL(file);
};

// Удаление
window.deletePost = (index) => {
  posts.splice(index, 1);
  renderPosts();
};

// Модалка
openModal.onclick = () => modal.classList.remove("hidden");
closeModal.onclick = () => modal.classList.add("hidden");

renderPosts();
