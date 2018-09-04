import React, { Component } from 'react';
import { logIn } from '../../utils/auth0';
import './LogIn.css';

class LogIn extends Component {

    componentDidUpdate() {
        //If renew access token fails, start login prompt
        if (this.props.refreshError) {
            logIn();
            return;
        }
    }

    onLogin = () => {
        this.props.refreshAccessToken(this.props.refreshToken);
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