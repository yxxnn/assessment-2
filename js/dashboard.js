import { createDocument } from './db.js';

document.addEventListener("DOMContentLoaded", function () {

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
                productName: document.getElementById("productName").value,
                productDescription: document.getElementById("productDesc").value,
                productPrice: document.getElementById("productPrice").value,
                productPictures: base64String
            };

            await createDocument("listings", jsonData);
        };

        reader.readAsDataURL(file);
    });
});