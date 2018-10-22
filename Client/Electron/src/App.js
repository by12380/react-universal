import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

import Profile from './components/Profile';
import LogIn from './components/LogIn';
import { loadSession } from './actions/authActions';
import { joinRoomSuccess } from './actions/socketActions';
import { APP_SERVER_URL } from './config';
import { initSubscriber } from './subscriber-client';

import logo from './logo.svg';
import './App.css';

const socket = io(APP_SERVER_URL);

class App extends Component {

  constructor(props) {
    super(props);

    props.loadSession();
  }

  componentDidMount() {
    initSubscriber(socket);
  }

  componentDidUpdate() {
    this.onSocketConnect();
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
              <Route exact path="/login" render={() => !this.props.isAuthenticated ? <LogIn /> : <Redirect to='/Profile' />} />
              <Route exact path="/profile" render={() => this.props.isAuthenticated ? <Profile /> : <Redirect to='/login' />} />
              <Route path="/" render={() => <Redirect exact to='/profile' />} />
            </div>
          </main>
        </div>
      </Router>
    );
  }

  onSocketConnect = () => {
    if (
      this.props.socketConnected
      && this.props.user_id
      && !this.props.roomJoined ) {
        socket.emit('room', this.props.user_id);
        this.props.joinRoomSuccess();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated:
      new Date().getTime() < state.authReducer.sessionItems.expiresAt,
    user_id: state.userReducer.user.sub,
    socketConnected: state.socketReducer.connectSuccess,
    roomJoined: state.socketReducer.joinRoomSuccess
  }
}

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    loadSession,
    joinRoomSuccess
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
