import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import * as serviceWorker from 'serviceWorker';

import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
