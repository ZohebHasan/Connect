import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';  
import reportWebVitals from './app/reportWebVitals';


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If reportWebVitals is being used, ensure it's typed or handled correctly.
reportWebVitals();
