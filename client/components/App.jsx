import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login.jsx';
import Homepage from '../pages/Homepage.jsx';
import ApplicationView from '../pages/ApplicationView.jsx';
import Signup from '../pages/Signup.jsx';
import Navbar from './Navbar.jsx';

import styles from '../styles/styles.css';

const App = (props) => {

  return <div>
    <Navbar />
    <Switch>
      <Route exact path ="/">
        <Login />
      </Route>
      <Route path = "/signup"> 
        <Signup />
      </Route>   
      <Route path = "/homepage">
        <Homepage /> 
      </Route>
      <Route path = "/applicationView" >     
        <ApplicationView />
      </Route>
    </Switch>
  </div>;
}

export default App;
