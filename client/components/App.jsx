import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import Login from '../pages/Login.jsx';
import Homepage from '../pages/Homepage.jsx';
import ApplicationView from '../pages/ApplicationView.jsx';
import Signup from '../pages/Signup.jsx';
import Navigation from './Navigation.jsx';
import bootstrap from 'bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/_custom.scss';

const App = (props) => {
  const [appsList, setAppsList] = useState([]);

  useEffect(() => {
    fetch('/api/applications', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAppsList(res);
        // console.log('2',res);
        // console.log('3',res.body);
      }).catch((err) => {
        console.log(err);
      });
  }, []);
 
  // console.log(Cookies.get());
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/homepage">
          <Homepage appsList={appsList} />
        </Route>
        <Route path="/applicationView/:id">
          <ApplicationView appsList={appsList} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
