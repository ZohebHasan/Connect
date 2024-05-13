import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';  
import reportWebVitals from './app/reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId="927314664227-e5ukk88gdjem7f4mn8dkk6op0fjv6ej8.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
  </React.StrictMode>
);

// If reportWebVitals is being used, ensure it's typed or handled correctly.
reportWebVitals();
