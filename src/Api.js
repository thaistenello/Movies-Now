import axios from 'axios';

export const getNowMovies = async () => {
  const apiKey = "cc2d414efb067771c7a7a9248294bfa0";

  try {
    // Requisição axios para a API
    const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        language: 'pt-BR',
        api_key: apiKey,
      },
    });

    // Organizar os dados
    const moviesData = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
      overview: movie.overview,
    }));

    return moviesData; // Retorna os dados organizados

  } catch (error) {
    console.error('Ocorreu um erro: ', error);
    return []; // Retorna array vazio em caso de erro
  }
};
