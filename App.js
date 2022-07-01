// do something!
import { Nav, NewsList } from './components/index.js';

const $root = document.querySelector('#root');

// Nav
const $nav = new Nav();
$nav.renderNav($root);

// NewsList
const $navlist = new NewsList();
$navlist.renderNewsList($root);


// Proxy
const categoryProxy = new Proxy($navlist, {
    set: (object, property, value) => {
        object[property] = value;
        return true;
    }
});

// Menu Click
document.querySelector('nav').addEventListener('click', (event) => {
    if (event.target.className === 'category-item') {
        document.querySelector('.active').classList.remove('active');
        event.target.classList.add('active');
        $navlist.clearNewsList();
        categoryProxy.category = event.target.id;
        categoryProxy.page = 1;
    }
})

// Scroll
function scrollObserver() {
    let target = document.querySelector('.scroll-observer');
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    let observer = new IntersectionObserver(() => {
        console.log(`scroll ${categoryProxy.page}`);
        categoryProxy.page++;
        $navlist.getNews(categoryProxy.category, categoryProxy.page, categoryProxy.pageSize);
    }, options);
    observer.observe(target);
}

window.addEventListener('DOMContentLoaded', () => {
    scrollObserver();
});
