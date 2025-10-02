import {
    fetchProducts,
    filterByCategory,
    initSearchBar,
    renderProducts,
} from "./global.js";

function setupCategoryFilters() {
    const categories = Array.from(
        document.querySelectorAll(".category-filter")
    ).filter((e) => e.innerText !== "All");

    document.querySelector(".category-filter").addEventListener("click", () => {
        let products = fetchProducts(15);
        renderProducts(products);
    });
    categories.forEach((category) => {
        category.addEventListener("click", () => {
            const categoryName = category.innerText;
            filterByCategory(categoryName).then((filteredProducts) => {
                console.log(filteredProducts);
                renderProducts(filteredProducts);
            });
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    fetchProducts(15).then((filteredProducts) => {
        renderProducts(filteredProducts);
        setupCategoryFilters();
        initSearchBar();
    });
});
