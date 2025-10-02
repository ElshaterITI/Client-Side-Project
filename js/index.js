import { fetchProducts, filterByCategory, searchForProduct, renderProducts, initSearchBar } from "./global.js";
function initHeroSearchRedirect() {
    const form = document.querySelector(".search-bar-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // Redirect to products.html
        window.location.href = "./products.html";
    });
}


// initSearchBar()
fetchProducts(5).then((data) => renderProducts(data));
document.addEventListener("DOMContentLoaded", () => {
    initHeroSearchRedirect();
});