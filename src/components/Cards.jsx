import { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Grid2 } from '@mui/material';
import { getNowMovies } from '../Api';

function Cards() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await getNowMovies();
      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, []);

  return (
    <Box sx={{height: '90vh', padding: ''}}>
      <Grid2 container spacing={2} wrap="nowrap">
        {movies.map((movie) => (
        <Grid2 key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg:4 }} flexShrink={0}>
          <Card sx={{ backgroundColor: '#0f0f10', height: '90vh'}}>
            <CardMedia
              component="img"
              height="100%"
              image={movie.image}
              alt={movie.title}
              sx={{objectFit: 'contain'}}
            /> 
          </Card>
        </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default Cards;
