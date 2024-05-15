import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      // Send the authorization code to the server
      axios.post('http://localhost:3000/auth/google/callback', { code })
        .then(response => {
          // Handle the response from the server
          console.log('User data:', response.data);
          navigate('/profile', { state: { user: response.data } });
        })
        .catch(error => {
          console.error('Error during authentication:', error);
        });
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Authenticating...</h1>
    </div>
  );
};

export default GoogleCallback;
