import React from 'react';
import logo from '../../logo.svg';
import './App.css';
//import axios from 'axios';
import PageTwo from '../../components/PageTwo/PageTwo'
import PageThree from '../../components/PageThree/PageThree';
import SignUp from '../../components/SignUp/SignUp';
//import Navigation from '../../components/Navigation';

import { withRouter, Route,  Switch, Redirect} from "react-router-dom";
//import { withFirebase } from '../../components/Firebase';

export const AuthContext = React.createContext({
  authenticated: false, userEmail: '', isAdmin: false});

const App = () => {

  const toggleMainNav = () => {
    return "display";
  }

  // const mainNavVisible = {
  //   display: toggleMainNav()
  // }

  return (
    //<AuthContext.Provider value={{ authenticated: false, isAdmin: false }}>
      <div className="App">
      {/* <Navigation/>
        <nav style={mainNavVisible}>
          <ul>
            <li style={mainNavVisible}><NavLink
              to="/"
              exact
              activeClassName="my-active"
              activeStyle={{
                color: '#fa923f',
                textDecoration: 'underline'
              }}>Home</NavLink></li>
            <li><NavLink
              to="/PageTwo"
              exact
              activeClassName="my-active"
              activeStyle={{
                color: '#fa923f',
                textDecoration: 'underline'
              }}>Page Two</NavLink></li>
            <li><NavLink
              to="/PageThree/:id"
              exact
              activeClassName="my-active"
              activeStyle={{
                color: '#fa923f',
                textDecoration: 'underline'
              }}>Page Three</NavLink>
            </li>
          </ul>
        </nav> */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Switch>
          <Route path="/" exact component={SignUp} />
          <Route path="/PageTwo/:stdid?" component={PageTwo} />
          <Route path="/PageThree/:id" exact component={PageThree} />
        </Switch>
      </div>
    //</AuthContext.Provider>

  );
}

export default withRouter(App);