import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    console.log("code is: " + code);
  
    if (code) {
      axios.post('http://localhost:3000/auth/google/callback', { code })
        .then(response => {
          console.log('User data:', response.data);
          navigate('/home', { state: { user: response.data } });
        })
        .catch(error => {
          console.error('Error during authentication:', error);
        });
    }
  }, [location, navigate]);

  return (
    <div>
      <p>Authenticating from google</p>
    </div>
  );
};

export default GoogleCallback;
