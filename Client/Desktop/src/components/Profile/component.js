import React, { Component } from 'react';
import { logOut } from '../../utils/auth0';
import './Profile.css';

class Profile extends Component {

    componentDidMount() {
        this.props.fetchUser(this.props.token)
    }

    render() {
        return (
            <div>
                { this.props.profile.picture
                ? <img className='profile-img' src={this.props.profile.picture} alt='User Profile'/>
                : null }
                
                { this.props.profile.name
                ? <p>Welcome, {this.props.profile.name}</p>
                : null }

                <button onClick={logOut}>Logout</button>
            </div>
        );
    }
}

export default Profile;