// Mock plant data (expandable for scalability)
const plants = [
    {
        id: 1,
        commonName: "Oak Tree",
        scientificName: "Quercus robur",
        images: ["oak-leaf.jpg", "oak-flower.jpg"], // Placeholder; use real URLs
        family: "Fagaceae",
        type: "Tree",
        region: "Europe",
        climate: "Temperate",
        soil: "Well-drained",
        growth: { sunlight: "Full sun", water: "Moderate", temp: "10-25°C" },
        lifeCycle: "Perennial, 200-300 years",
        medicinal: "Bark for tannins",
        importance: "Timber, ecology",
        toxicity: "Non-toxic",
        facts: "Symbol of strength."
    },
    // Add more plants here...
];

// DOM elements
const searchBar = document.getElementById('search-bar');
const filters = document.querySelectorAll('.filter');
const plantCardsContainer = document.getElementById('plant-cards');
const modeToggle = document.getElementById('mode-toggle');
const categoryCards = document.querySelectorAll('.category-card');

// Dark/Light mode toggle
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Render plant cards
function renderPlants(filteredPlants) {
    plantCardsContainer.innerHTML = '';
    filteredPlants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        card.innerHTML = `
            <img src="${plant.images[0]}" alt="${plant.commonName}" loading="lazy">
            <h3>${plant.commonName}</h3>
            <p>${plant.scientificName}</p>
        `;
        card.addEventListener('click', () => showDetailPage(plant));
        plantCardsContainer.appendChild(card);
    });
}

// Show detail page (modal or new page)
function showDetailPage(plant) {
    // For demo, alert; in real app, navigate to detail.html with plant data
    alert(Detail for ${plant.commonName}: ${plant.facts});
}

// Search and filter
function filterPlants() {
    const query = searchBar.value.toLowerCase();
    const activeFilters = Array.from(filters).filter(f => f.checked).map(f => f.value);
    
    const filtered = plants.filter(plant => {
        const matchesQuery = plant.commonName.toLowerCase().includes(query) ||
                             plant.scientificName.toLowerCase().includes(query) ||
                             plant.region.toLowerCase().includes(query) ||
                             plant.type.toLowerCase().includes(query);
        const matchesFilters = activeFilters.length === 0 || activeFilters.some(filter => {
            if (filter === 'medicinal') return plant.medicinal;
            if (filter === 'edible') return plant.importance.includes('edible');
            // Add more filter logic...
            return false;
        });
        return matchesQuery && matchesFilters;
    });
    renderPlants(filtered);
}

searchBar.addEventListener('input', filterPlants);
filters.forEach(f => f.addEventListener('change', filterPlants));

// Category filtering
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        const filtered = plants.filter(plant => {
            if (category === 'medicinal') return plant.medicinal;
            if (category === 'trees') return plant.type === 'Tree';
            // Add more...
            return false;
        });
        renderPlants(filtered);
    });
});

// Interactive map (using Leaflet)
const map = L.map('world-map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for plants
plants.forEach(plant => {
    L.marker([Math.random() * 50, Math.random() * 100]).addTo(map)
        .bindPopup(<b>${plant.commonName}</b><br>${plant.region});
});

// Initial render
renderPlants(plants);
