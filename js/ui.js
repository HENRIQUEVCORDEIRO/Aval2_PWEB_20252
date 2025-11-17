export function renderMovies(list, targetId = "grid-filmes") {
  const container = document.getElementById(targetId);
  if (!container) {
    console.warn("Elemento não encontrado: ", targetId);
    return;
  }

  container.innerHTML = list
    .map(
      (movie) =>
        `<div class="movie-card">
        <img id="movie-image"src="${
          movie.Poster !== "N/A" ? movie.Poster : "assets/image_placeholder.jpg"
        }" alt="${movie.Title}">
        <h3 id="title">${movie.Title}</h3>
        <p id="release-date">${movie.Year}</p>
        <button class="btn-details" onclick="window.location.href='details.html?id=${
          movie.imdbID
        }'">Ver detalhes</button>
    </div>`
    )
    .join("");
}

const statusArea = document.getElementById("status-area");
const listContainer = document.getElementById("grid-filmes");

export function showError(message, targetId = "grid-filmes") {
  const container = document.getElementById(targetId);
  if (container) container.innerHTML = `<p class="error">${message}</p>`;
  /*const container = document.getElementById("grid-filmes");
  container.innerHTML = `<p class="error">${message}</p>`;*/
}

export function showLoading(targetId = "grid-filmes") {
  const container = document.getElementById(targetId);
  if (container) container.innerHTML = "<p>Carregando...</p>";
  /*const container = document.getElementById("grid-filmes");
  container.innerHTML = `<p>Carregando...</p>`;*/
}
