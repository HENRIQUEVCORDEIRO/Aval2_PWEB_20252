const apiKey = "6c555263";
const baseURL = "https://www.omdbapi.com/";

export async function searchMovie(query) {
  const response = await fetch(`${baseURL}?apikey=${apiKey}&s=${query}`);
  if (!response.ok) throw new Error("Erro ao conectar à API OMDb");
  return await response.json();
}

export async function getMovieDetails(imdbID) {
  const response = await fetch(
    `${baseURL}?apikey=${apiKey}&i=${imdbID}&plot=full`
  );
  if (!response.ok) throw new Error("Erro ao exibir detalhes");
  return await response.json();
}

/*import { searchMovie } from './js/api.js';
searchMovie('casablanca').then(console.log);*/
