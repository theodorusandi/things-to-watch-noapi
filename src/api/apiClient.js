import axios from "axios";

export const getMovies = (movieData) => {
  return axios.get(
    `https://imdb-api.com/API/AdvancedSearch/k_ijtqdq15?user_rating=${movieData.rating},10&title_type=${movieData.type}&num_votes=100000,&genres=${movieData.genre}&count=50`
  );
};
