import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'App';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
