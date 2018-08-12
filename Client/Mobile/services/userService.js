import { getSessionItemsAsync } from './authService';
import { AUTH0_DOMAIN } from '../config';

async function getUserProfileFromAuth0Async() {

    try {
        let sessionItems = await getSessionItemsAsync()
        let response = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
            headers: {
                Authorization: `Bearer ${sessionItems.access_token}`
            }
        })

        if (response.status !== 200) throw `failed to get user profile with status ${response.status}`;
        
        const result = await response.json();
        return result;
    }
    catch(e){
        console.error(e);
        return null;
    }

}

module.exports = { getUserProfileFromAuth0Async };