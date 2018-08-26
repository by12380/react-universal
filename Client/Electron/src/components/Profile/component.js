import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {

    componentDidMount() {
        this.props.fetchUser(this.props.token)
    }

    onLogOut = () => {
        this.props.logout()
    }

    render() {
        return (
            <div>
                { this.props.user.picture
                ? <img className='profile-img' src={this.props.user.picture} alt='User Profile'/>
                : null }
                
                { this.props.user.name
                ? <p>Welcome, {this.props.user.name}</p>
                : null }

                <button className='logout-btn' onClick={this.onLogOut}>Logout</button>
            </div>
        );
    }
}

export default Profile;