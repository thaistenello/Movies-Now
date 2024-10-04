import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, Typography } from '@mui/material';

import Theme from './theme/ThemeProvider';
import Cards from './components/Cards'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Cards/>
    </ThemeProvider>
  );
}

export default App;
