export function renderMovies(list) {
  const container = document.getElementById("grid-filmes");
  if (!container) console.warn("Elemento não encontrado!");

  container.innerHTML = list
    .map(
      (movie) =>
        `<div class="movie-card">
        <img src="${
          movie.Poster !== "N/A" ? movie.Poster : "assets/image_placeholder.jpg"
        }" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button onclick="window.location.href='detalhes.html?id=${
          movie.imdbID
        }'">Ver detalhes</button>
    </div>`
    )
    .join("");
}

const statusArea = document.getElementById("status-area");
const listContainer = document.getElementById("grid-filmes");

export function showError(message) {
  statusArea.innerHTML = `<p class="error">${message}</p>`;
  listContainer.innerHTML = "";
  /*const container = document.getElementById("grid-filmes");
  container.innerHTML = `<p class="error">${message}</p>`;*/
}

export function showLoading() {
  statusArea.innerHTML = "<p>Carregando...</p>";
  listContainer.innerHTML = "";
  /*const container = document.getElementById("grid-filmes");
  container.innerHTML = `<p>Carregando...</p>`;*/
}
