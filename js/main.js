import { searchMovie, getMovieDetails } from "./api.js";
import { renderMovies, showError, showLoading } from "./ui.js";

const featuredIDs = [
  "tt4154796",
  "tt0468569",
  "tt1375666",
  "tt0133093",
  "tt0111161",
  "tt0034583",
  "tt0081505",
  "tt0093058",
  "tt0245429",
];

let currentQuery = "";
let currentPage = 1;
let totalResults = 0;

const sectionTitle = document.getElementById("section-title");

function $(id) {
  return document.getElementById(id);
}

function isIndexPage() {
  return Boolean($("grid-filmes") && $("section-title"));
}

async function loadFeaturedMovies() {
  showLoading("grid-filmes");
  sectionTitle.textContent = "Destaques";

  try {
    const movies = [];
    for (const id of featuredIDs) {
      const data = await getMovieDetails(id);
      movies.push(data);
    }
    renderMovies(movies, "grid-filmes");
  } catch (error) {
    console.error(error);
    showError("Erro ao carregar destaques.", "grid-filmes");
  }
}

async function performSearch(query, page = 1) {
  showLoading("grid-filmes");
  sectionTitle.textContent = "Resultados";

  currentQuery = query;
  currentPage = page;

  try {
    const data = await searchMovie(query, page);
    if (data.Response === "True") {
      totalResults = parseInt(data.totalResults);
      renderMovies(data.Search, "grid-filmes");
      renderPagination();
    } else {
      showError(data.Error || "Nenhum resultado encontrado", "grid-filmes");
    }
  } catch (error) {
    console.error(error);
    showError("Erro ao buscar filmes.", "grid-filmes");
  }
}

function renderPagination() {
  let nav = document.querySelector("#sinopse nav");
  const totalPages = Math.ceil(totalResults / 10);

  nav.innerHTML = `
    <button id="btn-prev" ${
      currentPage === 1 ? "disabled" : ""
    }>Anterior</button>
    <span>Página ${currentPage} / ${totalPages}</span>
    <button id="btn-next" ${
      currentPage === totalPages ? "disabled" : ""
    }>Próxima</button>
  `;

  document.getElementById("btn-prev").addEventListener("click", () => {
    if (currentPage > 1) performSearch(currentQuery, currentPage - 1);
  });

  document.getElementById("btn-next").addEventListener("click", () => {
    if (currentPage < totalPages) performSearch(currentQuery, currentPage + 1);
  });
}

function setupSearchBar() {
  const input = document.getElementById("search-input");
  const btn = document.getElementById("search-btn");
  const form = document.getElementById("search-bar");

  form.addEventListener("submit", (e) => e.preventDefault());

  btn.addEventListener("click", () => {
    const query = input.value.trim();
    if (query) performSearch(query);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = input.value.trim();
      if (query) performSearch(query);
      if (query === "") loadFeaturedMovies();
    }
  });

  input.addEventListener("input", () => {
    if (input.value.trim() === "") loadFeaturedMovies();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (isIndexPage()) {
    loadFeaturedMovies();
    setupSearchBar();
  }
});

async function testSearch() {
  console.log("Testando busca na API...");
  const result = await searchMovie("Casablanca");
  console.log("Resultado da API:", result);

  if (result && result.Search && result.Search.length > 0) {
    const movie = result.Search[0];
    console.log(`Primeiro resultado: ${movie.Title} (${movie.Year})`);
  } else {
    console.warn("NENHUM RESULTADO ENCONTRADO!");
  }
}

testSearch();
