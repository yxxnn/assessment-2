import { getDocuments } from './db.js';

function addItem(title, imgSrc, altText) {
    const listingCard = document.createElement('div');
    listingCard.className = 'listing-card';

    const anchor = document.createElement('a');
    anchor.href = '#';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = altText;
    
    anchor.appendChild(img);

    const paragraph = document.createElement('p');
    paragraph.textContent = title;

    listingCard.appendChild(anchor);
    listingCard.appendChild(paragraph);

    const container = document.getElementById('listing-container');
    container.appendChild(listingCard);
}

document.addEventListener("DOMContentLoaded", function () {
    getDocuments("listings").then((listings) => {
        listings.forEach((listing) => {
            addItem(listing.name, listing.images["base64String"], listing.description);
        });
    });
});