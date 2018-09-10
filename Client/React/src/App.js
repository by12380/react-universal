import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

import Profile from './components/Profile';
import LogIn from './components/LogIn';
import Callback from './components/Callback';
import { loadSession } from './actions/authActions';
import { APP_SERVER_URL } from './config';
import { configSocketIO } from './socket-io';

import logo from './logo.svg';
import './App.css';

const socket = io(APP_SERVER_URL);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scoketConnected: false
    }

    props.loadSession();
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated && !this.state.scoketConnected) {
      configSocketIO(socket, {user_id: this.props.user_id});
      this.setState({scoketConnected: true});
    }
  }

  render() {

    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <main>
            <div>
              <Route exact path="/" render={() => this.props.isAuthenticated ? <Profile /> : <Redirect to='/login' />} />
              <Route exact path="/login" render={() => !this.props.isAuthenticated ? <LogIn /> : <Redirect to='/' />} />
              <Route exact path="/callback" component={Callback} />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated:
      new Date().getTime() <
      (state.authReducer.sessionItems ? state.authReducer.sessionItems.expiresAt : null),
    user_id: state.userReducer.profile.sub
  }
}

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    loadSession
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(App);