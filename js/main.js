import { searchMovie, getMovieDetails } from "./api.js";
import { renderMovies, showError, showLoading } from "./ui.js";

const featuredIDs = [
  "tt4154796" /*Vingadores Ultimato*/,
  "tt0468569" /*Batman Cavaleiro das Trevas*/,
  "tt1375666" /*A Origem*/,
  "tt0133093" /*Matrix 1*/,
  "tt0111161" /*Um Sonho de Liberdade*/,
  "tt0034583" /*Casablanca*/,
  "tt0081505" /*O Iluminado*/,
  "tt0093058" /*Nascido Para Matar*/,
  "tt0245429" /*A Viagem de Chihiro*/,
];

let currentQuery = "";
let currentPage = 1;
let totalResults = 0;

const sectionTitle = document.getElementById("section-title");

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

  if (!nav) {
    console.warn("<nav> não encontrado. Criando automaticamente...");

    const section = document.getElementById("sinopse");
    if (!section) {
      console.error("ERRO: <section id='sinopse'> NÃO existe no HTML.");
      return;
    }

    nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Navegação de Página");
    section.appendChild(nav);
  }

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

  setTimeout(() => {
    const prev = document.getElementById("btn-prev");
    const next = document.getElementById("btn-next");

    if (!prev || !next) {
      console.error("Botões de paginação não foram criados.");
      return;
    }

    prev.addEventListener("click", () => {
      if (currentPage > 1) {
        performSearch(currentQuery, currentPage - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    next.addEventListener("click", () => {
      if (currentPage < totalPages) {
        performSearch(currentQuery, currentPage + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }, 0);
}

function setupSearchBar() {
  const input = document.getElementById("field-term");
  const btn = document.getElementById("search-button");
  const form = document.getElementById("search-bar");

  form.addEventListener("submit", (e) => e.preventDefault());
  btn.type = "button";

  /*if (!input || !btn) {
    console.warn("Elementos de busca não encontrados no HTML");
    return;
  }*/

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
    const query = input.value.trim();
    if (query === "") {
      loadFeaturedMovies();
      return;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedMovies();
  setupSearchBar();
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
