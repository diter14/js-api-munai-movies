// Elementos del DOM
const searchButton = document.getElementById("search-button");
const searchContainer = document.getElementById("search-container");
const searchInput = searchContainer.querySelector("input");

// Estado del buscador
let isSearchExpanded = false;

// Función para expandir/contraer el buscador
function toggleSearch() {
  isSearchExpanded = !isSearchExpanded;

  if (isSearchExpanded) {
    // Expandir el buscador
    searchContainer.classList.remove("opacity-0", "pointer-events-none");
    searchInput.classList.remove("w-0");
    searchInput.classList.add("w-64");
    // Pequeño delay para asegurar que la animación de opacidad comience después
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  } else {
    // Contraer el buscador
    searchInput.classList.remove("w-64");
    searchInput.classList.add("w-0");
    searchInput.value = "";
    // Esperar a que termine la animación del ancho antes de ocultar
    setTimeout(() => {
      searchContainer.classList.add("opacity-0", "pointer-events-none");
    }, 200);
  }
}

// Event Listeners
searchButton.addEventListener("click", toggleSearch);

// Cerrar el buscador al hacer clic fuera
document.addEventListener("click", (event) => {
  if (
    isSearchExpanded &&
    !searchContainer.contains(event.target) &&
    !searchButton.contains(event.target)
  ) {
    toggleSearch();
  }
});

// Manejar la búsqueda
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
      console.log("Buscando:", searchQuery);
      window.location.hash = `#search=${searchQuery}`
    }
  }
});
