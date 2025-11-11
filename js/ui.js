export function renderMovies(list) {
  const container = document.getElementById("movie-list");
  if (!container) return;

  container.innerHTML = list
    .map(
      (movie) =>
        `<div class="movie-card">
        <img src="${
          movie.Poster !== "N/A" ? movie.Poster : "assets/img/placehlder.jpg"
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

export function showError(message) {
  const container = document.getElementById("movie-list");
  container.innerHTML = `<p class="error">${message}</p>`;
}

export function showLoading() {
  const container = document.getElementById("movie-list");
  container.innerHTML = `<p>Carregando...</p>`;
}
