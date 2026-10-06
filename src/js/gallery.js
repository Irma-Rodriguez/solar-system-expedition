import { searchNasaImages } from "./nasa.js";

const searchForm = document.querySelector("#gallery-search-form");
const searchInput = document.querySelector("#gallery-search-input");
const galleryContainer = document.querySelector("#gallery-container");
const galleryStatus = document.querySelector("#gallery-status");
const topicButtons = document.querySelectorAll("[data-query]");

function createGalleryCard(item) {
    const data = item.data?.[0];
    const imageUrl = item.links?.[0]?.href;

    if (!data || !imageUrl) {
        return null;
    }

    const card = document.createElement("article");

    card.className = "gallery-card";

    card.innerHTML = `
    <div class="gallery-image-container">
        <img
            src="${imageUrl}"
            alt="${data.title || "NASA space image"}"
            loading="lazy"
        >
    </div>

    <div class="gallery-card-content">
        <h2>${data.title || "NASA Space Image"}</h2>

        ${data.description
            ? `<p>${data.description}</p>`
            : "<p>NASA image from the Image and Video Library.</p>"
        }
    </div>
`;

    return card;

}

function displayImages(images) {
    galleryContainer.innerHTML = "";

    const validImages = images
        .map((item) => createGalleryCard(item))
        .filter((card) => card !== null);

    if (validImages.length === 0) {
        galleryStatus.textContent =
            "No images were found. Try another search.";
        return;
    }

    validImages.forEach((card) => {
        galleryContainer.appendChild(card);
    });

    galleryStatus.textContent = `Showing ${validImages.length} NASA images.`;

}

async function searchGallery(query) {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
        galleryStatus.textContent = "Please enter a search term.";
        return;
    }

    galleryStatus.textContent = `Searching NASA for "${cleanQuery}"...`;
    galleryContainer.innerHTML = "";

    try {
        const images = await searchNasaImages(cleanQuery);

        displayImages(images);
    } catch (error) {
        console.error("Error loading NASA gallery:", error);

        galleryStatus.textContent =
            "We could not load NASA images. Please try again later.";

        galleryContainer.innerHTML = "";
    }

}

searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    searchGallery(searchInput.value);

});

topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const query = button.dataset.query;

        searchInput.value = query;

        searchGallery(query);
    });

});