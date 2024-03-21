// Function to load project details dynamically
function loadProjectDetails(projectURL) {
    fetch(projectURL)
        .then(response => response.text())
        .then(data => {
            document.getElementById('project-details').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading project details:', error);
        });
}

// Function to handle smooth scrolling when clicking on navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fetch and display blog posts from Medium profile
fetch('https://charlesbostwick.medium.com/?format=rss')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const items = xml.querySelectorAll('item');

        const blogPostsContainer = document.getElementById('blog-posts');

        items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const description = item.querySelector('description').textContent;

            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <article>
                    <h2><a href="${link}" target="_blank">${title}</a></h2>
                    <p>${description}</p>
                </article>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Error fetching blog posts:', error);
    });
