import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppleCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const id_token = query.get('id_token');
    const state = query.get('state');
    console.log("Code received from Apple: ", code);
    console.log("ID Token received from Apple: ", id_token);
    console.log("State received from Apple: ", state);

    if (code) {
      axios.post('http://localhost:3001/auth/apple/callback', { code, id_token })
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
      <p>Authenticating</p>
    </div>
  );
};

export default AppleCallback;
