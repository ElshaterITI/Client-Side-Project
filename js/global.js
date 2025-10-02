const API_BASE = "https://furniture-api.fly.dev/v1/products";

export async function fetchProducts(limit = 10) {
    try {
        const response = await fetch(`${API_BASE}?limit=${limit}&sort=newest`);
        const result = await response.json();

        if (!result.success) {
            console.log(
                "There may be an issue while fetching the data, Try again"
            );
            return;
        }
        console.log(`Fetched ${result.data.length} products:`, result.data);
        return result.data;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

export async function filterByCategory(category, limit = 10) {
    try {
        const response = await fetch(
            `${API_BASE}?limit=${limit}&sort=newest&category=${category.toLowerCase()}`
        );

        const result = await response.json();

        if (!result.success) {
            console.log(
                "There may be an issue while fetching the data, Try again"
            );
            return;
        }

        console.log(`Fetched ${result.data.length} products:`, result.data);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

export async function searchForProduct(productSearchQueryVal, limit = 10) {
    if (!productSearchQueryVal) return [];

    try {
        const response = await fetch(
            `${API_BASE}?limit=${limit}&sort=newest&name=${encodeURIComponent(productSearchQueryVal)}`
        );
        const result = await response.json();

        if (!result.success) {
            console.warn("Issue fetching data. Try again.");
            return [];
        }

        console.log(`Fetched ${result.data.length} products:`, result.data);
        return result.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}


export function renderProducts(products) {
    const container = document.querySelector(".product-card-container");
    container.innerHTML = "";
    console.log(products);
    container.innerHTML = products
        .map(
            (p) => `
                <div class="product-card"
                    data-id="${p.id}"
                    data-name="${p.name}"
                    data-price="${p.price}"
                    data-discount="${p.discount_price}"
                    data-image="${p.image_path}">
                        <div class="product-img-container">
                            <img
                                src="${p.image_path}"
                                alt=""
                                class="product-img"
                            />
                        </div>
                        <h4 class="product-name">${p.name}</h4>

                        <div class="price-and-actions-container">
                            <div class="product-price">
                                <span class="product-pre-offer-price">${p.price}$</span>
                                <span class="product-after-offer-price"
                                    >${p.discount_price}$</span
                                >
                            </div>
                            <div class="product-actions">
                                <svg
                                    class="fav-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path
                                        d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"
                                    />
                                </svg>
                                <svg
                                    class="cart-plus-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                                    <path
                                        d="M0 72C0 58.7 10.7 48 24 48L69.3 48C96.4 48 119.6 67.4 124.4 94L124.8 96L537.5 96C557.5 96 572.6 114.2 568.9 133.9L537.8 299.8C532.1 330.1 505.7 352 474.9 352L171.3 352L176.4 380.3C178.5 391.7 188.4 400 200 400L456 400C469.3 400 480 410.7 480 424C480 437.3 469.3 448 456 448L200.1 448C165.3 448 135.5 423.1 129.3 388.9L77.2 102.6C76.5 98.8 73.2 96 69.3 96L24 96C10.7 96 0 85.3 0 72zM160 528C160 501.5 181.5 480 208 480C234.5 480 256 501.5 256 528C256 554.5 234.5 576 208 576C181.5 576 160 554.5 160 528zM384 528C384 501.5 405.5 480 432 480C458.5 480 480 501.5 480 528C480 554.5 458.5 576 432 576C405.5 576 384 554.5 384 528zM336 142.4C322.7 142.4 312 153.1 312 166.4L312 200L278.4 200C265.1 200 254.4 210.7 254.4 224C254.4 237.3 265.1 248 278.4 248L312 248L312 281.6C312 294.9 322.7 305.6 336 305.6C349.3 305.6 360 294.9 360 281.6L360 248L393.6 248C406.9 248 417.6 237.3 417.6 224C417.6 210.7 406.9 200 393.6 200L360 200L360 166.4C360 153.1 349.3 142.4 336 142.4z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>`
        )
        .join("");

    function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast-notification";
        toast.innerText = message;
        document.body.appendChild(toast);

        // Animate and remove after 2s
        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 500);
        }, 2000);
    }

    container.querySelectorAll(".fav-icon").forEach((icon) => {
        icon.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");
            if (!card) return;

            const productData = {
                id: card.dataset.id?.trim(),
                name: card.dataset.name?.trim(),
                price: parseFloat(card.dataset.price) || 0,
                discount_price: parseFloat(card.dataset.discount) || 0,
                image_path: card.dataset.image?.trim(),
            };

            if (!productData.id) return;

            // Read existing wishlist from localStorage
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            // Filter out any invalid items in wishlist
            wishlist = wishlist.filter((item) => item && item.id);

            // Check if item already exists
            const exists = wishlist.some(
                (item) => String(item.id) === String(productData.id)
            );

            if (!exists) {
                wishlist.push(productData);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                showToast("✅ Added to wishlist!");
            } else {
                showToast("⚠️ Already in wishlist!");
            }
        });
    });

    // Cart
    container.querySelectorAll(".cart-plus-icon").forEach((icon) => {
        icon.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");

            const productData = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                discount_price: parseFloat(card.dataset.discount),
                image_path: card.dataset.image,
                quantity: 1,
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const exists = cart.some((item) => item.id === productData.id);
            if (!exists) {
                cart.push(productData);
                localStorage.setItem("cart", JSON.stringify(cart));
                showToast("🛒 Added to cart!");
            } else {
                showToast("⚠️ Already in cart!");
            }
        });
    });
}

export function initSearchBar() {
    const containerSelector = ".search-bar-container";
    const container = document.querySelector(containerSelector);
    const searchInput = container.querySelector(".search-bar-input");
    const searchButton = container.querySelector("button");

    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        searchForProduct(searchInput.value.trim()).then(
            products =>{
                console.log(products);
                renderProducts(products)
            }
        );
        console.log(products);
        renderProducts(products)
        
    });
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("Clicked")
            searchForProduct(searchInput.value.trim()).then(
            products =>{
                console.log(products);
                renderProducts(products)
            }
        );
        }
    });
}
