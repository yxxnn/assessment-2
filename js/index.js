import { getDocuments } from './db.js';

const validCategories = ['men', 'women', 'kids', 'sale'];

function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
}

function addItem(title, imgSrc, altText, productPage) {
    const listingCard = document.createElement('div');
    listingCard.className = 'listing-card';

    const anchor = document.createElement('a');
    anchor.href = `/viewer/ProductPG.html?id=${productPage}`;

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

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const categoryFilter = getProductId();
        const listings = await getDocuments("listings");

        if (!categoryFilter) {
            
            for (const key in listings) {
                const listing = listings[key];
                console.log(listing.name);
                addItem(listing.name, listing.images[0], listing.description, key);
            }
            return;
        }

        if (!validCategories.includes(categoryFilter)) {
            console.error(`Invalid filter option: ${categoryFilter}`);
            return;
        }

        for (const key in listings) {
            const listing = listings[key];
            if (listing.category === categoryFilter) {
                console.log(listing.name);
                addItem(listing.name, listing.images[0], listing.description, key);
            }
        }

    } catch (error) {
        console.error("Error fetching listings:", error);
    }
});