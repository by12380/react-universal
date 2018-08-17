import React from 'react';
import { auth } from '../../utils/auth0';

const LogIn = (props) => {
    const onClick = () => {
        auth.authorize();
    }

    return (
        <div>
            <p>LogIn page</p>
            <button onClick={onClick}>
                Log In
            </button>
        </div>
    );
}

export default LogIn;