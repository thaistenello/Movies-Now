import { useEffect, useState } from 'react';
import { Box, Card, CardMedia, CircularProgress, Grid2, CardContent, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

import { getNowMovies } from '../Api';
import MovieModal from './MovieModal';
import '../css/Components.css';

function Cards() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  // Modal
  const [open, setOpen] = useState(false);  
  const [selectedMovie, setSelectedMovie] = useState(null); 

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await getNowMovies();
      setMovies(fetchedMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);         
  };
  
  const handleClose = () => {
    setOpen(false);         
    setSelectedMovie(null);  
  };

  return (
    <Box sx={{ height: '80vh', width: 'auto'}}>
      {loading ? (
        <Box className='center' sx={{height: '70vh'}}>
          <CircularProgress size="90px"/>
        </Box>
      ) : movies.length > 0 ? (
        <Box container spacing={2} sx={{ display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end' }}>

          {/* Swiper */}
          <Swiper
          modules={[Mousewheel]}
          direction="horizontal"
          spaceBetween={30}
          loop={true}
          mousewheel={true}
          breakpoints={{
            0: {
              direction: 'horizontal',
              slidesPerView: 1,
                    },
            600: {
              direction: 'horizontal',
              slidesPerView: 2.5,
            },
            1024: {
              direction: 'horizontal',
              slidesPerView: 3.5, 
            }
          }}
          style={{display:'flex', alignItems:'center', justifyContent:'center'}}
          >

            {/* Cards */}
            {movies.map((movie) => (
              <SwiperSlide key={movie.id} sx={{}}>
                <Grid2>
                  <Card className='center'
                    sx={{ 
                      maxHeight: '85vh',
                      backgroundColor: '#0a0a0a',
                    }} 
                    onClick={() => handleOpen(movie)} // Open Modal
                  >
                    {/* Images */}
                    <CardMedia
                      component="img"
                      image={movie.image} 
                      alt={`Poster do filme ${movie.title}`}
                      sx={{ 
                        objectFit: 'contain', 
                        height: '100%', 
                        filter: 'brightness(70%)', 
                        transition: 'filter 0.3s ease', 
                        '&:hover': {
                          filter: 'brightness(100%)',
                        }}}
                    />

                    {/* Date */}
                    <CardContent className='date-center'>
                      <Typography className='center'  
                      sx={{
                        border: '1px solid', 
                        borderRadius: '6px', 
                        padding: '5px', 
                        gap:'8px', 
                        color:'#dfd7cc', 
                        paddingInline:'20px', 
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 0 
                        }
                      }}>
                        <StarIcon fontSize="small"/>{new Date(movie.date).toLocaleDateString('pt-BR')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : (
        // Error
        <Box className='center' sx={{ height: '90vh' }}>
          <h3>Desculpe. Temos um problema</h3>
        </Box>
      )}

      {/* Modal (MovieModal) */}
      <MovieModal open={Boolean(open)} handleClose={handleClose} movie={selectedMovie} />

    </Box>
  );
}

export default Cards;
