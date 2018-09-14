import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { getTokensFromAuthCallback } from '../../utils/auth0'

class Callback extends Component {

    componentDidMount() {
        this.handleAuthCallback();
    }

    handleAuthCallback = () => {
        getTokensFromAuthCallback()
        .then(authResult => {
            const sessionItems = {
                accessToken: authResult.access_token,
                idToken: authResult.id_token,
                expiresAt: authResult.expires_at
            }
            this.props.fetchUser(sessionItems.accessToken);
            this.props.loginSuccess(sessionItems);
        })
        .catch(e => {
            if (e.error) {
                this.props.refreshTokenError();
            } else {
                this.props.loginError();
            }
        })
    }

    redirectToProfile() {
        if (this.props.success) {
            return <Redirect to='/' />
        }
    }

    redirectToLogin() {
        if (this.props.error || this.props.refreshError) {
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