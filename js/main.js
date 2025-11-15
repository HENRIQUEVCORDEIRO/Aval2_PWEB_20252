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

async function loadFeaturedMovies() {
  showLoading("grid-filmes");

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

async function performSearch(query) {
  showLoading("search-results");

  try {
    const data = await searchMovie(query);
    if (data.Response === "True") {
      renderMovies(data.Search, "search-results");
    } else {
      showError("Nenhum resultado encontrado", "search-results");
    }
  } catch (error) {
    console.error(error);
    showError("Erro ao buscar filmes.", "search-results");
  }
}

function setupSearchBar() {
  const input = document.getElementById("search-input");
  const btn = document.getElementById("search-btn");

  if (!input || !btn) {
    console.warn("Elementos de busca não encontrados no HTML");
    return;
  }

  btn.addEventListener("click", () => {
    const query = input.value.trim();
    if (query) performSearch(query);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = input.value.trim();
      if (query) performSearch(query);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedMovies();
  setupSearchBar();
});

/*document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const btn = document.getElementById("search-btn");

  btn.addEventListener("click", () => {
    const query = input.ariaValueMax.trim();
    if (query) performSearch(query);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = input.ariaValueMax.trim();
      if (query) performSearch(query);
    }
  });

  performSearch("a");
});*/

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
