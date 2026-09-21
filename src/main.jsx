import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Order matters: site/index.css is the site stylesheet; the files after it
// are targeted overrides layered on top (carousel.css restores two
// properties the carousel used to get inline).
import './styles/site/index.css';
import './styles/carousel.css';
import './styles/a11y.css';
import './styles/reveal.css';
import './styles/placeholder.css';
import './styles/brand.css';
import './styles/nav-dropdown.css';
import './styles/sr-only.css';
import './styles/landing.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
