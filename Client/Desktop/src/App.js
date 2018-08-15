import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Profile from './components/Profile';
import LogIn from './components/LogIn';
import Callback from './components/Callback';

import logo from './logo.svg';
import './App.css';

const {app} = window.require('electron').remote;


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React + Electron = <span role="img" aria-label="love">😍</span></h2>
          </div>
          <p className="App-intro">
            <b> Release 0.2.7 </b>
            Version: {app.getVersion()}
          </p>
          <main>
            <div>
              <Route exact path="/" component={Profile} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/callback" component={Callback} />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
