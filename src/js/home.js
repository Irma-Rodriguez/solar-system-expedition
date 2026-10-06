import HOME_IMAGES from "./home-images.js";

const featureImages = document.querySelectorAll(".feature-image");

featureImages.forEach((image) => {
    const type = image.dataset.image;

    if (HOME_IMAGES[type]) {
        image.src = HOME_IMAGES[type];
    }
});
