// ... (your existing match fetching code) ...

// --- Football News Fetching ---
const newsApiKey = "20382486e7f94ae29b00aea44dc35f92"; // Replace with your actual News API key
const newsContainer = document.getElementById("blog-list");

fetch(
  `https://newsapi.org/v2/everything?q=football&language=en&sortBy=publishedAt&apiKey=${newsApiKey}`,
  {
    // You might not need custom headers for some news APIs, check their docs
  }
)
  .then((res) => res.json())
  .then((newsData) => {
    console.log("News API Response:", newsData);

    if (!newsData.articles || newsData.articles.length === 0) {
      newsContainer.innerHTML =
        '<div class="no-matches">No football news found.</div>';
      return;
    }
    let newsHtml = "";
    newsData.articles.forEach((article) => {
      // Display top 5 articles
      if (article.title && article.url) {
        // Ensure title and URL exist
        newsHtml += `
           <div class="col-md-6 col-lg-4">
              <div class="card blog-card">
                <img
                  src="${article.urlToImage}"
                  class="card-img-top"
                  alt="Blog Image"
                />
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text">${
                    article.description ? article.description : ""
                  }</p>
                  <a href="${
                    article.url
                  }" class="btn btn-primary" target="_blank">Read More</a>
                </div>
              </div>
            </div>`;
      }
    });
    newsContainer.innerHTML = newsHtml;
  })
  .catch((err) => {
    console.error("Error fetching news:", err);
    newsContainer.innerHTML =
      '<div class="no-matches">Error loading news data.</div>';
  });
