import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import { BrowserRouter as Link } from 'react-router-dom'

//pages

import MainPage from "./pages/index"
import DevicePage from "./pages/device"
import UserPage from "./pages/users"
import AppPage from "./pages/apps"
import NotFoundPage from "./pages/404"


class App extends Component {
  state = {

    "phones" : [
      ],

    users: [
    ],
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/users" component={UserPage}/>
          <Route exact path="/devices" component={DevicePage}/>
          <Route exact path="/apps" component={AppPage}/>
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404"/>
        </Switch>
      </Router>
    );
  }
}

export default App;
