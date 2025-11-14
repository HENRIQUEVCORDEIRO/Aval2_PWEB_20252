import { searchMovie } from "./api.js";
import { renderMovies, showError, showLoading } from "./ui.js";

async function performSearch(query) {
  showLoading();

  try {
    const data = await searchMovie(query);
    if (data.Response === "True") {
      renderMovies(data.Search);
    } else {
      showError("Nenhum resultado encontrado");
    }
  } catch (error) {
    console.error(error);
    showError("Erro ao carregar filmes. Tente novamente mais tarde.");
  }
}

document.addEventListener("DOMContentLoaded", performSearch);

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
