import React, { Component } from 'react';
import './LogIn.css';


class LogIn extends Component {

    componentDidUpdate() {
        //If renew access token fails, start login prompt
        if (this.props.refreshError) {
            this.props.login();
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