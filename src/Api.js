import axios from 'axios';

//Key
export const getNowMovies = async () => {
  const apiKey = "cc2d414efb067771c7a7a9248294bfa0";

  try {
    // Loading
    await new Promise(resolve => setTimeout(resolve, 500));

    // Genres list
    const genresResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: apiKey,
        language: 'pt-BR',
      },
    });

    const genres = genresResponse.data.genres;

    // Axios request for API
    const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&region=BR', {
      params: {
        language: 'pt-BR',
        api_key: apiKey,
      },
    });

    // Dates
    const moviesData = await Promise.all(response.data.results.map(async (movie) => {
      const releaseResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/release_dates`, {
        params: {
          api_key: apiKey,
        },
      });

      // Certification for Brazil (BR)
      const brazilRelease = releaseResponse.data.results.find(release => release.iso_3166_1 === 'BR');
      const certification = brazilRelease ? brazilRelease.release_dates[0]?.certification : 'N/A'; 

      // Map genres
      const movieGenres = movie.genre_ids.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : null;
      }).filter(Boolean); 

      return {
        id: movie.id,
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
        overview: movie.overview,
        date: movie.release_date,
        certification: certification,
        genres: movieGenres,
      };
    }));

    return moviesData;

  } catch (error) {
    console.error('Ocorreu um erro: ', error);
    return []; 
  }
};
