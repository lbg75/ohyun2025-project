const API_BASE = 'http://crud.tlol.me/lbg/post';
const userId = 'testuser'; // 실제 서비스에서는 로그인 정보로 대체

// 공략글 목록 불러오기
async function fetchPosts() {
    const res = await fetch(`${API_BASE}/${userId}`);
    const posts = await res.json();
    renderPosts(posts);
}

// 공략글 등록
async function createPost(title, content) {
    await fetch(`${API_BASE}/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
    });
    fetchPosts();
}

// 공략글 삭제
async function deletePost(id) {
    await fetch(`${API_BASE}/${userId}/${id}`, { method: 'DELETE' });
    fetchPosts();
}

// 공략글 렌더링
function renderPosts(posts) {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `
            <div class="post-title">${post.title}</div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button onclick="deletePost('${post.id}')">삭제</button>
            </div>
        `;
        postsDiv.appendChild(div);
    });
}

document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    createPost(title, content);
    this.reset();
});

// 초기 로딩
fetchPosts();
