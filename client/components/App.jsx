import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login.jsx';
import Homepage from '../pages/Homepage.jsx';
import ApplicationView from '../pages/ApplicationView.jsx';
import Signup from '../pages/Signup.jsx';
import Navigation from './Navigation.jsx';
import bootstrap from 'bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/_custom.scss';

const App = (props) => {

  return <div>
    <Navigation />
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
