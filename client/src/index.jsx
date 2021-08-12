import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import * as serviceWorker from 'serviceWorker';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'index.css';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Router>
        <Route path='/'>
          <App />
        </Route>
      </Router>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
