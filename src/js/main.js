import { getPlanets } from "./planets.js";
import { getNasaImage } from "./nasa.js";
import PLANET_IMAGES from "./planet-images.js";

const planetContainer = document.querySelector("#planet-container");
const planetModal = document.querySelector("#planet-modal");
const modalContent = document.querySelector("#modal-planet-content");
const modalClose = document.querySelector("#modal-close");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

function createPlanetCard(planet) {
    const card = document.createElement("article");

    card.className = "planet-card";

    card.innerHTML = `
        <div class="planet-image-placeholder">
            ${PLANET_IMAGES[planet.name]
            ? `
                        <img
                            src="${PLANET_IMAGES[planet.name]}"
                            alt="${planet.name}"
                        >
                    `
            : `
                        <span aria-hidden="true">🪐</span>
                    `
        }
        </div>

        <div class="planet-card-content">
            <h2>${planet.name}</h2>

            <button
                class="learn-more"
                type="button"
                data-planet="${planet.name}"
            >
                Learn More
            </button>
        </div>
    `;

    const learnMoreButton = card.querySelector(".learn-more");

    learnMoreButton.addEventListener("click", () => {
        openPlanetModal(planet);
    });

    return card;
}

async function openPlanetModal(planet) {
    modalContent.innerHTML = `
        <div class="modal-loading">
            <p>Loading NASA image...</p>
        </div>
    `;

    planetModal.showModal();

    try {
        const nasaImage = await getNasaImage(planet.name);

        modalContent.innerHTML = `
            ${nasaImage
                ? `
                    <div class="modal-planet-image">
                        <img
                            src="${nasaImage.imageUrl}"
                            alt="${nasaImage.title}"
                        >
                    </div>
                    `
                : `
                    <div class="modal-planet-image" aria-hidden="true">
                        <span>🪐</span>
                    </div>
                    `
            }

            <h2>${planet.name}</h2>

            ${nasaImage?.description
                ? `
                    <p class="nasa-description">
                        ${nasaImage.description}
                    </p>
                    `
                : ""
            }

            <div class="planet-details">

                <div class="planet-detail">
                    <span>Mass</span>
                    <strong>${planet.mass} Earth masses</strong>
                </div>

                <div class="planet-detail">
                    <span>Radius</span>
                    <strong>${planet.radius} Earth radii</strong>
                </div>

                <div class="planet-detail">
                    <span>Temperature</span>
                    <strong>${planet.temperature} K</strong>
                </div>

                <div class="planet-detail">
                    <span>Orbital Period</span>
                    <strong>${planet.period} days</strong>
                </div>

                <div class="planet-detail">
                    <span>Distance from Sun</span>
                    <strong>${planet.semi_major_axis} AU</strong>
                </div>

            </div>
        `;
    } catch (error) {
        console.error("Error loading NASA image:", error);

        modalContent.innerHTML = `
            <div class="modal-planet-image" aria-hidden="true">
                <span>🪐</span>
            </div>

            <h2>${planet.name}</h2>

            <p class="error-message">
                We could not load the NASA image.
            </p>

            <div class="planet-details">

                <div class="planet-detail">
                    <span>Mass</span>
                    <strong>${planet.mass} Earth masses</strong>
                </div>

                <div class="planet-detail">
                    <span>Radius</span>
                    <strong>${planet.radius} Earth radii</strong>
                </div>

                <div class="planet-detail">
                    <span>Temperature</span>
                    <strong>${planet.temperature} K</strong>
                </div>

                <div class="planet-detail">
                    <span>Orbital Period</span>
                    <strong>${planet.period} days</strong>
                </div>

                <div class="planet-detail">
                    <span>Distance from Sun</span>
                    <strong>${planet.semi_major_axis} AU</strong>
                </div>

            </div>
        `;
    }
}


function closePlanetModal() {
    planetModal.close();
}

menuButton?.addEventListener("click", () => {
    navigation?.classList.toggle("open");

    const isOpen = navigation?.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
});

async function displayPlanets() {
    if (!planetContainer) {
        return;
    }

    try {
        planetContainer.innerHTML = "<p>Loading planets...</p>";

        const planets = await getPlanets();

        planetContainer.innerHTML = "";

        planets.forEach((planet) => {
            const card = createPlanetCard(planet);

            planetContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading planets:", error);

        planetContainer.innerHTML = `
        <p class="error-message">
            We could not load the planet information.
            Please try again later.
        </p>
    `;
    }


}

modalClose?.addEventListener("click", closePlanetModal);

planetModal?.addEventListener("click", (event) => {
    if (event.target === planetModal) {
        closePlanetModal();
    }
});

displayPlanets();