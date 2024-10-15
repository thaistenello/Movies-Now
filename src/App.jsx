import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import { ThemeProvider, CssBaseline } from '@mui/material';

import Theme from './theme/ThemeProvider';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import Modal from './components/MovieModal'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Navbar />
      <Cards />
      <Modal />
    </ThemeProvider>
  );
}

export default App;
