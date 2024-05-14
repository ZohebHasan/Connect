import react from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleOauth() {

  return (
    <>
      <div><h1>Google Sign in</h1></div>
      <br>
      </br>

      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      ;


    </>
  )
}