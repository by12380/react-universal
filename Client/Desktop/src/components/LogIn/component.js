import React, { Component } from 'react';
import { auth } from '../../utils/auth0';

class LogIn extends Component {

    componentDidMount() {
        this.autoLogIn()
    }

    onClick = () => {
        auth.authorize();
    }

    autoLogIn() {
        //If renew access token fails, start login prompt
        if (this.props.renewError) {
            auth.authorize();
            return;
        }

        //Automatically check and renew access token when vist page
        this.props.renewToken();
    }

    render() {
        return (
            <div>
                <p>LogIn page</p>
                <button onClick={this.onClick}>
                    Log In
                </button>
            </div>
        );
    }
}

export default LogIn;