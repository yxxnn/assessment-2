import { getDocumentByID } from './db.js';

function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function showLoadingAnimation() {
    const loadingContainer = document.getElementById('loading-animation');
    loadingContainer.style.display = 'block';
}

function hideLoadingAnimation() {
    const loadingContainer = document.getElementById('loading-animation');
    loadingContainer.style.display = 'none';
}

async function displayProduct(productId) {
    showLoadingAnimation();
    const product = await getDocumentByID("listings", productId);
    if (product) {
        document.querySelector('.product-info h2').textContent = product.name.replace(/\b\w/g, char => char.toUpperCase());
        document.querySelector('.product-info .price').textContent = `$${product.price}`;
        document.querySelector('.product-info .condition').textContent = product.condition;
        document.querySelector('.product-info .description').textContent = product.description;

        const mainImageElement = document.querySelector('.main-image img');
        const thumbnailImageElement = document.getElementById('thumbnail-image');
        const thumbnailList = document.querySelector('.thumbnail-list');
        const image = product.images["0"];
        const button = document.createElement('button');
        const img = document.createElement('img');

        img.src = image;
        img.classList.add('thumbnail');

        thumbnailList.innerHTML = '';
        mainImageElement.src = image;
        thumbnailImageElement.src = image;

        button.addEventListener('click', () => {
            mainImageElement.src = image;
            mainImageElement.alt = product.description;
            thumbnailImageElement.src = image;
        });

        thumbnailList.appendChild(img);

        const addToCart = document.getElementById("add-to-cart");
        addToCart.addEventListener('click', () => {
            if (!localStorage.getItem("authenticated")) {
                console.log("User is not authenticated.");
                alert("You are not logged in.");
                window.location.href = `/auth/login.html`;
                return;
            }        

            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            if (cartItems.some(item => item.id === productId)) {
                warn("Item already in cart.");
                return;
            }

            let newItem = {
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1,
                description: product.description,
                imageUrl: image
            }

            cartItems.push(newItem);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            console.log("Item added to cart.")
        });
    } else {
        console.error('Product not found');
        alert("Product not found.")
        return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    hideLoadingAnimation();
}

document.addEventListener('DOMContentLoaded', async () => {
    await displayProduct(await getProductId());
});