import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const basename = process.env.NODE_ENV === 'production' ? '/shringar-tech.github.io' : '';

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root')
);