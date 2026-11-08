// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Filtro demonstrativo dos imóveis cadastrados no HTML
const searchButton = document.getElementById("searchButton");
const propertyType = document.getElementById("propertyType");
const purpose = document.getElementById("purpose");
const neighborhood = document.getElementById("neighborhood");
const propertyCards = [...document.querySelectorAll(".property-card")];
const emptyState = document.getElementById("emptyState");

function filterProperties() {
  const type = propertyType.value;
  const deal = purpose.value;
  const place = neighborhood.value.trim().toLocaleLowerCase("pt-BR");
  let visible = 0;

  propertyCards.forEach(card => {
    const matchesType = type === "todos" || card.dataset.type === type;
    const matchesPurpose = deal === "todos" || card.dataset.purpose === deal;
    const matchesPlace = !place || card.dataset.location.toLocaleLowerCase("pt-BR").includes(place);
    const show = matchesType && matchesPurpose && matchesPlace;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
searchButton.addEventListener("click", filterProperties);
neighborhood.addEventListener("keydown", event => {
  if (event.key === "Enter") filterProperties();
});

// Favoritos visuais (não são salvos em banco de dados)
document.querySelectorAll(".favorite").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    button.textContent = button.classList.contains("active") ? "♥" : "♡";
    button.setAttribute("aria-pressed", button.classList.contains("active"));
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
