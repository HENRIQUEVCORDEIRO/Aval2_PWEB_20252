import { searchMovie } from "./api";
import { renderMovies, showError, showLoading } from "./ui";

async function initCatalog() {
  const query = "batman";
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

document.addEventListener("DOMContentLoaded", initCatalog);
