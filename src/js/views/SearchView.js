// Estado del buscador
let isSearchExpanded = false;

// Elementos del DOM
const searchButton = document.getElementById("search-button");
const searchContainer = document.getElementById("search-container");
const searchInput = searchContainer.querySelector("input");

// Funciones de manejo del buscador
function expandSearch() {
    searchContainer.classList.remove("opacity-0", "pointer-events-none");
    searchInput.classList.remove("w-0");
    searchInput.classList.add("w-64");
    
    setTimeout(() => {
        searchInput.focus();
    }, 100);
}

function collapseSearch() {
    searchInput.classList.remove("w-64");
    searchInput.classList.add("w-0");
    searchInput.value = "";
    
    setTimeout(() => {
        searchContainer.classList.add("opacity-0", "pointer-events-none");
    }, 200);
}

function toggleSearch() {
    isSearchExpanded = !isSearchExpanded;
    
    if (isSearchExpanded) {
        expandSearch();
    } else {
        collapseSearch();
    }
}

function handleClickOutside(event) {
    if (
        isSearchExpanded &&
        !searchContainer.contains(event.target) &&
        !searchButton.contains(event.target)
    ) {
        toggleSearch();
    }
}

function handleSearch(event) {
    if (event.key === "Enter") {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            window.location.hash = `#search=${searchQuery}`;
        }
    }
}

// Inicialización
function initGlobalSearch() {
    searchButton.addEventListener("click", toggleSearch);
    searchInput.addEventListener("keyup", handleSearch);
    document.addEventListener("click", handleClickOutside);
}

export default initGlobalSearch; 