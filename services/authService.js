import { AuthSession } from 'expo';
import { 
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_API_AUDIENCE } from '../config';

async function logInAsync() {
    try {
        const REDIRECT_URI = AuthSession.getRedirectUrl();
        let result = await AuthSession.startAsync({
            authUrl:
            `https://${AUTH0_DOMAIN}/authorize?` +
            `&audience=${AUTH0_API_AUDIENCE}` +
            `&scope=offline_access` +
            `&response_type=code` +
            `&client_id=${AUTH0_CLIENT_ID}` +
            `&redirect_uri=${REDIRECT_URI}`
        });
        if (result.type === 'success') {
            return await exchangeCodeForTokenAsync(result.params.code);
        }
        else
        {
            return {cancelled: true};
        }
    }
    catch(e)
    {
      console.error(e);
      return {error: true};
    }
}

async function exchangeCodeForTokenAsync(code) {
    try {
        const REDIRECT_URI = AuthSession.getRedirectUrl();
        let response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'grant_type': 'authorization_code',
                'client_id': AUTH0_CLIENT_ID,
                'client_secret': AUTH0_CLIENT_SECRET,
                'code': code,
                'redirect_uri': REDIRECT_URI
            }),
        })
        return await response.json();
    }
    catch(e)
    {
        console.error(e);
        return {error: true};
    }
}

module.exports = { logInAsync };