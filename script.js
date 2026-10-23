const gems = [
    { id: 1, name: "Midnight Sapphire", type: "Sapphire", origin: "Sri Lanka", carat: "3.42 ct", price: "POA", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85", description: "A deep, velvety blue with an almost ink-like saturation. This unheated oval carries a quiet, exceptional glow.", colour: "Blue" },
    { id: 2, name: "Garden Emerald", type: "Emerald", origin: "Colombia", carat: "2.18 ct", price: "$8,400", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85", description: "A vivid green emerald with a lively garden of inclusions and a beautifully balanced rectangular cut.", colour: "Green" },
    { id: 3, name: "Rosecut Ruby", type: "Ruby", origin: "Mozambique", carat: "1.76 ct", price: "$5,900", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85", description: "A glowing raspberry-red ruby, rose-cut by hand to preserve its natural, softly luminous character.", colour: "Red" },
    { id: 4, name: "Golden Beryl", type: "Other", origin: "Brazil", carat: "5.06 ct", price: "$3,200", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85", description: "Warm champagne tones meet a bright, open cut in this generous golden beryl from Minas Gerais.", colour: "Yellow" },
    { id: 5, name: "Twilight Spinel", type: "Other", origin: "Vietnam", carat: "1.92 ct", price: "$4,750", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85", description: "A rare violet-grey spinel with a moody shift in changing light and a crisp cushion cut.", colour: "Violet" },
    { id: 6, name: "Seafoam Tourmaline", type: "Other", origin: "Namibia", carat: "4.11 ct", price: "$6,100", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85", description: "A fresh seafoam tourmaline with extraordinary clarity and a soft, watery gradient of colour.", colour: "Green" }
];

const gallery = document.querySelector("#gallery");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
const favoritesCount = document.querySelector("#favoritesCount");
const fallbackGems = gems;
const hasSupabaseConfig = window.GEMORA_SUPABASE_URL && !window.GEMORA_SUPABASE_URL.includes("your-project") && window.GEMORA_SUPABASE_ANON_KEY && !window.GEMORA_SUPABASE_ANON_KEY.includes("your-anon-key");
const supabaseClient = hasSupabaseConfig ? window.supabase.createClient(window.GEMORA_SUPABASE_URL, window.GEMORA_SUPABASE_ANON_KEY) : null;
let catalog = fallbackGems;
let activeFilter = "All";
let showFavorites = false;
let favorites = [];
let favoritesStorageAvailable = true;

try {
    favorites = JSON.parse(localStorage.getItem("gemora-favorites") || "[]");
} catch (error) {
    if (error instanceof DOMException && error.name === "SecurityError") {
        favoritesStorageAvailable = false;
        console.warn("Favorites will only be kept for this tab because browser storage is unavailable.");
    } else if (error instanceof SyntaxError) {
        console.error("Saved favorites could not be read because their stored data is invalid.", error);
    } else {
        throw error;
    }
}

async function getGems() {
    if (!supabaseClient) return catalog;
    const { data, error } = await supabaseClient.from("gems").select("*").order("created_at", { ascending: true });
    if (error || !data?.length) return catalog;
    catalog = data;
    return catalog;
}

function renderGallery(items) {
    gallery.innerHTML = items.map((gem) => `
        <div class="col-sm-6 col-lg-4">
            <article class="gem-card" data-id="${gem.id}" tabindex="0" role="button" aria-label="View details for ${gem.name}">
                <button class="heart-btn ${favorites.includes(gem.id) ? "saved" : ""}" data-favorite="${gem.id}" type="button" aria-label="${favorites.includes(gem.id) ? "Remove" : "Save"} ${gem.name}">${favorites.includes(gem.id) ? "♥" : "♡"}</button>
                <div class="gem-card-image"><img src="${gem.image}" alt="${gem.name}" loading="lazy"></div>
                <div class="gem-card-body"><h3>${gem.name}</h3><div class="gem-card-meta"><span>${gem.type} · ${gem.origin}</span><span>${gem.carat}</span></div></div>
            </article>
        </div>`).join("");
    emptyState.classList.toggle("d-none", items.length > 0);
    gallery.querySelectorAll(".gem-card").forEach((card) => {
        card.addEventListener("click", (event) => {
            if (!event.target.closest("[data-favorite]")) openGem(Number(card.dataset.id));
        });
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") openGem(Number(card.dataset.id));
        });
    });
    gallery.querySelectorAll("[data-favorite]").forEach((button) => button.addEventListener("click", toggleFavorite));
}

function updateGallery() {
    const query = searchInput.value.trim().toLowerCase();
    getGems().then((items) => renderGallery(items.filter((gem) => {
        const matchesFilter = activeFilter === "All" || gem.type === activeFilter || (activeFilter === "Other" && gem.type === "Other");
        const matchesSearch = !query || `${gem.name} ${gem.type} ${gem.origin} ${gem.colour}`.toLowerCase().includes(query);
        const matchesFavorites = !showFavorites || favorites.includes(gem.id);
        return matchesFilter && matchesSearch && matchesFavorites;
    })));
}

function toggleFavorite(event) {
    event.stopPropagation();
    const id = Number(event.currentTarget.dataset.favorite);
    favorites = favorites.includes(id) ? favorites.filter((favorite) => favorite !== id) : [...favorites, id];
    if (favoritesStorageAvailable) {
        try {
            localStorage.setItem("gemora-favorites", JSON.stringify(favorites));
        } catch (error) {
            if (error instanceof DOMException && error.name === "SecurityError") {
                favoritesStorageAvailable = false;
                console.warn("Favorites will only be kept for this tab because browser storage is unavailable.");
            } else {
                throw error;
            }
        }
    }
    favoritesCount.textContent = favorites.length;
    updateGallery();
}

function openGem(id) {
    const gem = catalog.find((item) => item.id === id);
    document.querySelector("#modalContent").innerHTML = `<div class="col-md-6 modal-image" style="background-image:url('${gem.image}')"><span class="visually-hidden">${gem.name}</span></div><div class="col-md-6 modal-info"><p class="eyebrow">${gem.type} · ${gem.origin}</p><h2 id="gemModalTitle">${gem.name}</h2><p>${gem.description}</p><div class="detail-list"><div><span>Weight</span><span>${gem.carat}</span></div><div><span>Colour</span><span>${gem.colour}</span></div><div><span>Availability</span><span>Private viewing</span></div></div><a class="btn btn-ink mt-4" href="mailto:hello@gemora.example?subject=Enquiry about ${encodeURIComponent(gem.name)}">Enquire about this stone ↗</a></div>`;
    bootstrap.Modal.getOrCreateInstance(document.querySelector("#gemModal")).show();
}

document.querySelectorAll(".filter-btn").forEach((button) => button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateGallery();
}));
searchInput.addEventListener("input", updateGallery);
document.querySelector("#favoritesButton").addEventListener("click", () => {
    showFavorites = !showFavorites;
    document.querySelector("#favoritesButton").classList.toggle("active", showFavorites);
    document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
    updateGallery();
});
favoritesCount.textContent = favorites.length;
updateGallery();
window.addEventListener("scroll", () => document.querySelector(".site-nav").classList.toggle("scrolled", window.scrollY > 20));
