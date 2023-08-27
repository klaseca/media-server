import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from 'App';
import 'index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Router>
        <Route path='/'>
          <App />
        </Route>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
