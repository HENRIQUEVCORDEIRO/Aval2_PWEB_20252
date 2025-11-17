const apiKey = "6c555263";
const baseURL = "https://www.omdbapi.com/";

export async function searchMovie(query, page = 1) {
  const finalURL = `${baseURL}?apikey=${apiKey}&s=${encodeURIComponent(
    query
  )}&page=${page}`;
  console.log("🔎 URL da busca:", finalURL);

  const response = await fetch(finalURL);
  if (!response.ok) {
    throw new Error("Erro ao conectar à API OMDb");
  }

  const data = await response.json();
  if (data.Response === "False") {
    return {
      Response: "False",
      Error: data.Error || "Nenhum resultado encontrado",
      totalResults: 0,
      Search: [],
    };
  }
  return data;
}

export async function getMovieDetails(imdbID) {
  const response = await fetch(
    `${baseURL}?apikey=${apiKey}&i=${imdbID}&plot=full`
  );
  if (!response.ok) throw new Error("Erro ao exibir detalhes");
  return await response.json();
}


