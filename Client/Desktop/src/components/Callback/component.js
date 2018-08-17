import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { getTokensFromAuthCallbackAsync } from '../../utils/auth0'

class Callback extends Component {

    async componentDidMount() {
        this.handleAuthCallback();
    }

    handleAuthCallback = () => {
        getTokensFromAuthCallbackAsync()
        .then(authResult => {

            const sessionItems = {
                accessToken: authResult.accessToken,
                idToken: authResult.idToken,
                expiresAt: authResult.expiresAt
            }
        
            this.props.loginSuccess(sessionItems);

        })
        .catch(err => {
            this.props.loginError();
        })
    }
    

    redirectToProfile() {
        if (this.props.success) {
            return <Redirect to='/' />
        }
    }

    redirectToLogin() {
        if (this.props.error) {
            console.log('hi');
            return <Redirect to='/login' />
        }
    }

    render() {
        return (
            <div>
                {this.redirectToProfile()}
                {this.redirectToLogin()}
                <p>Callback page</p>
            </div>
        );
    }
}

export default Callback;