const finnhub = require('finnhub');

// Установка API ключа
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "WOQWhKke152iCfgJRvhnC34rRAvPnii3";
const finnhubClient = new finnhub.DefaultApi();

// Элемент, куда будут добавляться новости
const newsContainer = document.querySelector('.row.g-4');

finnhubClient.marketNews("general", {}, (error, data, response) => {
  if (error) {
    console.error("Ошибка при получении новостей:", error);
    return;
  }

  data.slice(0, 3).forEach((newsItem) => {
    const newsCard = document.createElement('article');
    newsCard.className = 'col-lg-4';

    newsCard.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${newsItem.image}" class="card-img-top" alt="News image">
        <div class="card-body">
          <h5 class="card-title">${newsItem.headline}</h5>
          <p class="card-text"><strong>Source:</strong> ${newsItem.source}</p>
          <p class="card-text"><strong>Date:</strong> ${new Date(newsItem.datetime * 1000).toLocaleDateString()}</p>
          <p class="card-text">${newsItem.summary}</p>
          <a href="${newsItem.url}" class="btn btn-dark" target="_blank">Read more</a>
        </div>
      </div>
    `;

    newsContainer.appendChild(newsCard);
  });
});
