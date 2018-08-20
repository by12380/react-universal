import React, { Component } from 'react';
import { logIn } from '../../utils/auth0';
import './LogIn.css';

class LogIn extends Component {

    onLogin = () => {
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
                <button className='login-btn' onClick={this.onLogin}>
                    Log In
                </button>
            </div>
        );
    }
}

export default LogIn;