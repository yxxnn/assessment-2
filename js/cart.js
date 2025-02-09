function addItem(title, price, imgSrc, productId) {
    const cartCard = document.createElement('div');
    cartCard.className = 'cart-item-card';

    const anchor = document.createElement('a');
    anchor.className = 'product-card';
    anchor.href = `/viewer/ProductPG.html?id=${productId}`;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = title;
    
    anchor.appendChild(img);

    const descriptionElement = document.createElement('div');
    descriptionElement.className = "product-info";
    
    const titleElement = document.createElement('p');
    titleElement.textContent = title;

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${price}`;

    descriptionElement.appendChild(titleElement);
    descriptionElement.appendChild(priceElement);

    anchor.appendChild(descriptionElement);
    cartCard.appendChild(anchor);
    
    const container = document.getElementById('cart-items');
    container.appendChild(cartCard);
}

function clearCart() {
    localStorage.setItem("cartItems", []);
}

document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (!cartItems.length) {
        // no items in cart, tell user to go buy smt??
        return;
    }

    let total = 0;

    cartItems.forEach(cartItem => {
        addItem(cartItem.name, cartItem.price, cartItem.imageUrl, cartItem.id);
        total += cartItem.price;
    });

    const totalElement = document.getElementById("cart-total");
    totalElement.textContent = `$${total}`;
});