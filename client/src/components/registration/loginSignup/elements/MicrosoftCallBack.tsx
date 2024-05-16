import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MicrosoftCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    console.log("Code received from Microsoft: ", code);

    if (code) {
      axios.post('http://localhost:3001/auth/microsoft/callback', { code })
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
      <p>Authenticating from microsoft</p>
    </div>
  );
};

export default MicrosoftCallback;
