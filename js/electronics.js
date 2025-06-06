document.addEventListener('DOMContentLoaded', () => {
    // --- Electronics Team Posts/Updates Logic (unchanged) ---
    const postForm = document.getElementById('electronicsPostForm');
    const contentArea = document.getElementById('electronicsContentArea');

    let electronicsPosts = JSON.parse(localStorage.getItem('electronicsPosts')) || [];

    function renderPosts() {
        if (!contentArea) return;
        contentArea.innerHTML = '';
        if (electronicsPosts.length === 0) {
            contentArea.innerHTML = '<p class="text-light">No updates or resources posted yet. Use the form above to share something with the team!</p>';
            return;
        }
        electronicsPosts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'card resource-item mb-3';
            postElement.innerHTML = `
                <div class="card__body">
                    <p>${post.text.replace(/\n/g, '<br>')}</p>
                    ${post.file ? `<p class="mt-2"><em><i class="fas fa-paperclip"></i> File: ${post.file}</em></p>` : ''}
                    <small class="text-light">Posted on: ${new Date(post.timestamp).toLocaleString()}</small>
                    <button class="btn btn--danger btn--sm remove-post-btn mt-2" data-index="${index}" style="float: right;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            contentArea.appendChild(postElement);
        });
        document.querySelectorAll('.remove-post-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                removePost(parseInt(e.target.dataset.index));
            });
        });
    }

    function addPost(text, fileName) {
        const newPost = {
            text: text,
            file: fileName,
            timestamp: new Date().toISOString()
        };
        electronicsPosts.unshift(newPost);
        localStorage.setItem('electronicsPosts', JSON.stringify(electronicsPosts));
        renderPosts();
    }

    function removePost(index) {
        electronicsPosts.splice(index, 1);
        localStorage.setItem('electronicsPosts', JSON.stringify(electronicsPosts));
        renderPosts();
    }

    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const postText = document.getElementById('electronicsPostText').value;
            const fileInput = document.getElementById('electronicsFileUpload');
            const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : null;

            if (postText.trim() === '' && !fileName) {
                alert('Please enter a message or select a file.');
                return;
            }

            addPost(postText.trim(), fileName);
            postForm.reset();
        });
    }

    renderPosts();
    // --- END: Electronics Team Posts/Updates Logic ---

    // All resource table logic is now handled by resource-manager.js (modal-based system)
    // No local data arrays, rendering, or event handlers for electronics resource tables here.
});
