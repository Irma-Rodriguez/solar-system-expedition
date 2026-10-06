const NASA_API_URL = "https://images-api.nasa.gov/search";

const NASA_SEARCH_TERMS = {
    Mercury: "Mercury planet",
    Venus: "Venus planet",
    Earth: "Earth from space",
    Mars: "Mars surface",
    Jupiter: "Jupiter planet",
    Saturn: "Saturn planet",
    Uranus: "Uranus planet",
    Neptune: "Neptune planet",
};

export async function searchNasaImages(query) {
    const params = new URLSearchParams({
        q: query,
        media_type: "image",
    });

    const url = `${NASA_API_URL}?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to retrieve NASA images.");
    }

    const data = await response.json();

    return data.collection.items;
}

export async function getNasaImage(query) {
    const searchTerm = NASA_SEARCH_TERMS[query] || `${query} planet`;

    const images = await searchNasaImages(searchTerm);

    const excludedWords = [
        "launch",
        "rocket",
        "spacecraft",
        "mission",
        "atlas-centaur",
        "kepler",
        "chart",
        "diagram",
    ];

    const image = images.find((item) => {
        const title = item.data?.[0]?.title?.toLowerCase() || "";
        const description =
            item.data?.[0]?.description?.toLowerCase() || "";

        const text = `${title} ${description}`;

        const containsExcludedWord = excludedWords.some((word) =>
            text.includes(word)
        );

        return item.links?.[0]?.href && !containsExcludedWord;
    });

    if (!image) {
        return null;
    }

    return {
        imageUrl: image.links[0].href,
        title: image.data?.[0]?.title || `${query} NASA image`,
        description: image.data?.[0]?.description || "",
    };
}

