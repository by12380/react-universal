export const storeSession = (sessionItems) => {
    try {
        localStorage.setItem('access_token', sessionItems.accessToken);
        localStorage.setItem('id_token', sessionItems.idToken);
        localStorage.setItem('expires_at', sessionItems.expiresAt);
    }
    catch (e)
    {
        console.error(e);
    }
}

export const getSession = () => {
    try {
        const sessionItems = {};
        sessionItems.accessToken = localStorage.getItem('access_token');
        sessionItems.idToken = localStorage.getItem('id_token');
        sessionItems.expiresAt = localStorage.getItem('expires_at');
        return sessionItems;
    }
    catch (e)
    {
        console.error(e);
        return {};
    }
}

export const clearSession = () => {
    try {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        return true;
    }
    catch (e)
    {
        console.error(e);
        return false;
    }
}