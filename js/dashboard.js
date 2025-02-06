import { createDocument } from './db.js';

// on load
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("create-button").addEventListener("click", async (e) => {
        e.preventDefault();

        let productName = document.getElementById("productName").value;
        let productDescription = document.getElementById("productDesc").value;
        let productPrice = document.getElementById("productPrice").value;
        let productPictures = document.getElementById("productImage").value;

        const jsonData = {
            productName,
            productDescription,
            productPrice,
            productPictures
        }

        await createDocument("listings", jsonData);
    });
});