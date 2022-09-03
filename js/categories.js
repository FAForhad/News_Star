
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        // error handler
        .catch(err => console.log(err))
    
}
const displayCategories = (categories) => {
    categories.forEach( category => {
        const categories = document.getElementById('categories')
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('fs-5')
        tagDiv.classList.add('mb-5')
        tagDiv.innerHTML = `
        <button class="btn" onclick="loadNews('${category.category_id}','${category.category_name}'),setToggle(true)">${category.category_name}</button> 
        `
        categories.appendChild(tagDiv)
    });
}

const loadNews = (id,name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data , name))
            // error handler
        .catch(err => console.log(err))
}

const displayNews = (newses, name) => {

    const newsList = document.getElementById('news-list');
    const sort = newses?.sort((a, b) => (a.total_view > b.total_view ? -1 : 1));
    newsList.textContent = '';

    const newsResult = document.getElementById('news-result');
    if (newses.length === 0) {
        newsResult.innerText = `${name} has found no news`;
        newsResult.classList.add('text-danger');
    }
    else {
        newsResult.innerText = `${newses.length} News found in ${name}`
        newsResult.classList.remove('text-danger')
    }

    sort.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card')
        newsDiv.classList.add('my-3')
        newsDiv.classList.add('mx-5')

        newsDiv.innerHTML = `
        <div class="row">
        <div class="col-md-3">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
        </div>
        <div class="col-md-9">
        <div class="card-body">
            <h5 class="card-title pb-2">${news.title ? news.title : 'no title found'}</h5>
            <p class="card-text pb-3">${news.details.length > 400 ? news.details.slice(0, 400) + ' ...' : news.details}</p>
                <div class="mt-5">
                    <div class="d-flex  flex-lg-row justify-content-between align-items-center">
                        <div class="d-flex flex-column flex-md-column flex-lg-row w-25">
                            <img src="${news.author.img ? news.author.img : 'img!!'}" class="img-fluid w-25 py-2 rounded-circle" alt="...">
                            <div class="mx-1" >
                                <p class="px-1">${news.author.name ? news.author.name : 'No Author Found'}</p>
                                <p class="px-1">${news.author.published_date ? news.author.published_date : 'no date found'}</p>
                            </div>
                        </div>
                        <h6 class="ps-2"> ${news.total_view ? 'Views ' + news.total_view : 'No Views'}</h6>
                        <button class="btn btn-outline-secondary px-5" onclick="loadNewsDetails('${news._id}')" type="button" data-bs-toggle="modal" data-bs-target="#newsModal">Details</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `
        newsList.appendChild(newsDiv);
    });
    setToggle(false);
}
const loadNewsDetails = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
            // error handler
        .catch(err => console.log(err))
}

const displayNewsDetails = (details) => {
    console.log(details)
    const newsModalLabel = document.getElementById('newsModalLabel');
    newsModalLabel.innerText = details.author.name;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img src="${details.image_url ? details.image_url : 'no image found'}" class="img-fluid rounded-start mh-100" alt="...">
    // <h5 class="card-title pb-5">${details.title ? details.title : 'no title found'}</h5>
    <p class="card-text pb-5">${details.details ? details.details : 'no details found'}</p>
    <p class="card-text pb-2">${details.author.published_date ? details.author.published_date : 'no published date found'}</p>
    <p class="card-text pb-2">Rating : ${details.rating.number ? details.rating.number : 'no rating found'} "${details.rating.badge ? details.rating.badge : 'no badge found'}"</p>
    `
}

const setToggle = (isLoading) => {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

loadNews('01','treanding news')

loadCategories()