import { createTheme } from "@mui/material"

export const Theme = createTheme ({
    typography: {
      allVariants: {
        fontFamily: 'Roboto, Arial, sans-serif',
        color: '#f8f9fa',
        fontWeight: '300'
      },

      h1: {
        fontWeight: '500',
        fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)', 
        lineHeight: 1.2
      },

      h2: {
      },

      body1: {
        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
        lineHeight: 1.2
      },

      body2: {
        color:'#d7d8d7',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)' 
      },
    },

    palette: {
      background: {
        default: '#0a0a0a', // Define a cor de fundo global
      },
    },
})

export default Theme
