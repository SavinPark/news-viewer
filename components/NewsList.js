// do something!
class NewsList {
    constructor() {
        this.category = 'all';
        this.page = 1;
        this.pageSize = 5;
    }

    async getNews($category, $page, $pageSize) {
        const newslist =document.querySelector('.news-list');
        const apiKey = '13475a9ff97a45219e9263ce34b08490';
        const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${$category === 'all' ? '' : $category}&page=${$page}&pageSize=${$pageSize}&apiKey=${apiKey}`
        let response;
        try {
            response = await axios.get(url);
            console.log(response.data.articles);
            response.data.articles.forEach(article => {
                newslist.innerHTML += `<section class="news-item">
                                            <div class="thumbnail">
                                                <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                                                    <img src="${article.urlToImage}" alt="thumbnail" />
                                                </a>
                                            </div>
                                            <div class="contents">
                                                <h2>
                                                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a>
                                                </h2>
                                                <p>${article.description}</p>
                                            </div>
                                        </section>`
            })
        } catch (error) {
            console.log(`Error >> ${error}`)
        }
    }

    renderNewsList($container) {
        $container.innerHTML += `<div class="news-list-container">
                                    <article class="news-list"></article>
                                    <div class="scroll-observer">
                                        <img src="img/ball-triangle.svg" alt="Loading..." />
                                    </div>
                                 </div>`;
    }

    clearNewsList() {
        const newslist =document.querySelector('.news-list');
        newslist.innerHTML='';
    }

}

export default NewsList;