import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, CardMedia, Box, CircularProgress, Grow } from '@mui/material';
import '../css/Global.css'

// Classification images
const certificationImages = {
  'L': `${process.env.PUBLIC_URL}/assets/images/L.png`,
  '10': `${process.env.PUBLIC_URL}/assets/images/10.png`,
  '12': `${process.env.PUBLIC_URL}/assets/images/12.png`,
  '14': `${process.env.PUBLIC_URL}/assets/images/14.png`,
  '16': `${process.env.PUBLIC_URL}/assets/images/16.png`,
  '18': `${process.env.PUBLIC_URL}/assets/images/18.png`,
  'N/A': `${process.env.PUBLIC_URL}/assets/images/n-a.png`,
};

function MovieModal({ open, handleClose, movie }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movie) {
      setError(true);
    } else {
      setError(false);
    }
  }, [movie]);

  return (
    <Dialog 
      open={open}
      onClose={handleClose}
      TransitionComponent={Grow}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '69%',
          height: 'auto',
          backgroundColor: '#1D1D1D'
        },
      }}
    >
      {error ? (
        <DialogContent>
          <Typography className='center' variant="h1" color="error">
            Erro ao carregar os dados do filme. Por favor, tente novamente.
          </Typography>
        </DialogContent>
      ) : movie ? (
        <DialogContent 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap:'3vw', 
          padding: '3vw'
        }}>
          {/* Image */}
          <CardMedia
            component="img"
            image={movie.image}
            alt={`Poster do filme ${movie.title}`}
            sx={{ width:{
              lg: '40%',
              md: '45%',
              sm: '45%',
            },
            display: {
              xs: 'none', // Não exibe em telas xs (extra pequenas)
              sm: 'none', // Não exibe em telas sm (pequenas)
              md: 'block', // Exibe em telas md (médias) e maiores
            }
          }}
          />
          <Box 
          sx={{ 
            width:{
              lg: '75%',
              md: '70%',
              sm: '100%',
              xs: '100%',
            }, 
            flexDirection: 'column', 
            top: '0' 
          }}>

            {/* Title */}
            <DialogTitle component="div" 
            sx={{ 
              padding: 0, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'flex-start' 
            }}>
              <Typography variant="h1" sx={{ textAlign: 'center'}}>
                {movie.title ? movie.title : 'Título não disponível'}
              </Typography>
            </DialogTitle>


            {/* Description */}
            <Box className="description-scroll"
            sx={{ 
              maxHeight: '310px', 
              width: 'auto', 
              overflowY: 'auto', 
              padding: '1vw' 
            }}>
              <Typography
                sx={{
                  color: '#fff',
                  lineHeight: '4vh',
                  textAlign: movie.overview ? 'left' : 'center',
                }}
              >
                {movie.overview ? movie.overview : 'Descrição não disponível'}
              </Typography>
            </Box>

            {/* Classification and genres */}
            <Box className='center' sx={{ gap: '1.5vw', marginTop: '5vh' }}>
            <Box>
              {certificationImages[movie.certification] ? (
                <img
                  style={{ width: '50px', height: 'auto' }}
                  src={certificationImages[movie.certification]}
                  alt={`Certificação ${movie.certification}`}
                />
              ) : (
                <img
                  style={{ width: '50px', height: 'auto' }}
                  src={certificationImages['N/A']}
                  alt="Certificação não disponível"
                />
              )}
            </Box>
              <Typography variant="body2">
                {movie.genres ? movie.genres.join(', ') : 'N/A'}
              </Typography>
            </Box>

          </Box>
        </DialogContent>
      ) : (
        <Box className='center' sx={{ height: '50vh', padding: '2rem'}}>
          <CircularProgress />
        </Box>
      )}
    </Dialog>
  );
}

export default MovieModal;
