import { getMovieDetails } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    console.error("Nenhum ID informado na URL");
    return;
  }

  try {
    const data = await getMovieDetails(id);

    const titleLmnt = document.querySelector("#details-view header h1");
    if (titleLmnt) titleLmnt.textContent = `${data.Title} (${data.Year})`;

    const synopsisLmnt = document.querySelector("#movie-synopsis");
    if (synopsisLmnt)
      synopsisLmnt.textContent =
        data.Plot !== "N/A" ? data.Plot : "Sinopse indisponível.";

    const ratingLmnt = document.querySelector("#rating-value");
    if (ratingLmnt)
      ratingLmnt.textContent =
        data.imdbRating !== "N/A" ? data.imdbRating : "—";

    const view = document.querySelector("#details-view");
    if (view) view.hidden = false;
  } catch (err) {
    console.error("Erro ao carregar detalhes:", err);
  }
});
