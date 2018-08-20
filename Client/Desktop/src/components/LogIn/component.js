import React, { Component } from 'react';
import { auth, logIn } from '../../utils/auth0';

class LogIn extends Component {

    componentDidMount() {
        this.autoLogIn()
    }

    autoLogIn() {
        //If renew access token fails, start login prompt
        if (this.props.renewError) {
            logIn();
            return;
        }

        //Automatically check and renew access token when vist page
        this.props.renewToken();
    }

    render() {
        return (
            <div>
                <p>LogIn page</p>
                <button onClick={logIn}>
                    Log In
                </button>
            </div>
        );
    }
}

export default LogIn;