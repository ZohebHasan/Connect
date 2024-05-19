// creating the google Oauth client 
// params: client_id, client_secret, redirect_uri
// creating the scopes object
// creating the auth url
// exporting the google Oauth url
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
export default function googleOauthGenerator() {
    // creating the Oauth client for google
    const OauthClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID as string,
        process.env.GOOGLE_CLIENT_SECRET as string,
        process.env.GOOGLE_REDIRECT_URI as string
    );
    // creating the scopes object for the google Oauth
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];
    // creating the url for the google Oauth
    const authURl = OauthClient.generateAuthUrl({
        access_type: 'offline',
        scope: scopes.join(' ')
    });
    return authURl
}
/**
 * 1. user clicks on the google login button 
 * 2. from the google login it triggers a get request '/google/auth' which will redirect to the google login page
 * 3. from '/auth/google' it will create a new instance of the google Oauth client and generate the auth url
 * 4. the user will be redirected to the google login page
 * 5. the user will login with their google account 
 * 6. the user will be redirected to the '/auth/google/callback' with a code
 * 7. the code will be used to get the user data from google
 * 8. the user data will be used to create a new user in the database
 * 9. the user will be redirected to the home page
 * 
 * 
 */