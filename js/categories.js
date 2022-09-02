const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}
const displayCategories = (categories) => {
    categories.forEach( category => {
        const categories = document.getElementById('categories')
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('fs-5')
        tagDiv.classList.add('mb-5')
        tagDiv.innerHTML = `
        <button class="btn onclick="">${category.category_name}</button> 
        `
        categories.appendChild(tagDiv)
    });
}

const loadNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}

const displayNews = (newses) => {
    newses.forEach(news => {
        console.log(news)
        const newsList = document.getElementById('news-list')
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card')
        newsDiv.classList.add('my-3')
        newsDiv.classList.add('mx-5')
        newsDiv.innerHTML = `
        <div class="row">
        <div class="col-md-3">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
        <div class="card-body">
            <h5 class="card-title pb-3">${news.title}</h5>
            <p class="card-text pb-5">${news.details.slice(0, 400 )} ...</p>
            <div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex w-25">
                        <img src="${news.author.img}" class="img-fluid w-25 py-2 rounded-circle" alt="...">
                        <div class="mx-1" >
                            <p class="px-1">${news.author.name}</p>
                            <p class="px-1">${news.author.published_date}</p>
                        </div>
                    </div>
                    <h6 class="ps-2">Views ${news.total_view}</h6>
                    <button class="btn btn-outline-success px-5">Details</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        `
        newsList.appendChild(newsDiv)
    });
}
loadNews()


loadCategories()