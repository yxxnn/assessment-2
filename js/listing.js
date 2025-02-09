import { createDocument } from './db.js';

document.addEventListener("DOMContentLoaded", function () {

    if (!localStorage.getItem("authenticated")) {
        console.log("User is not authenticated, redirect to login page.");
        window.location.href = `/auth/login.html`;
    }

    const fileInput = document.getElementById("productImage");
    const previewImage = document.getElementById("preview-image");
    const fileNameDisplay = document.getElementById("file-name");

    fileInput.addEventListener("change", function() {
        const file = this.files[0];

        if (file) {
            fileNameDisplay.textContent = file.name;

            const reader = new FileReader();
            reader.onload = (event) => {
                previewImage.src = event.target.result;
                previewImage.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            fileNameDisplay.textContent = "No file chosen";
            previewImage.style.display = "none";
        }
    });

    document.getElementById("create-listing").addEventListener("click", async (e) => {
        e.preventDefault();

        if (!document.getElementById("productCategory").value) {
            alert("Please select the product's Category before submitting.");
            return;
        }

        if (!document.getElementById("productCondition").value) {
            alert("Please select the product's Condition before submitting.");
            return;
        }

        // Convert the selected image to Base64
        const file = fileInput.files[0];
        if (!file) {
            alert("Please select an image before submitting.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;

            const jsonData = {
                name: document.getElementById("productName").value,
                description: document.getElementById("productDesc").value,
                price: document.getElementById("productPrice").value,
                category: document.getElementById("productCategory").value,
                images: {"0": base64String},
                userId: localStorage.getItem("userId"),
                condition: document.getElementById("productCondition").value
            };

            await createDocument("listings", jsonData);
            alert("Listing Created.");
            window.location.href = `/index.html`;
        };

        reader.readAsDataURL(file);
    });
});