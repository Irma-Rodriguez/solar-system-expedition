const API_URL = "https://api.api-ninjas.com/v1/planets";

const API_KEY = import.meta.env.VITE_PLANETS_API_KEY;

const PLANET_NAMES = [
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
];

export async function getPlanet(name) {
    const response = await fetch(
        `${API_URL}?name=${encodeURIComponent(name)}`,
        {
            headers: {
                "X-Api-Key": API_KEY,
            },
        }
    );

    if (!response.ok) {
        throw new Error(`Unable to retrieve ${name} data.`);
    }

    return response.json();
}

export async function getPlanets() {
    const requests = PLANET_NAMES.map((name) => getPlanet(name));

    const results = await Promise.all(requests);

    return results.flat();
}
