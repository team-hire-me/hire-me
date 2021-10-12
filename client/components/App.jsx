import React from 'react';

import Login from '../pages/Login.jsx';
import Homepage from '../pages/Homepage.jsx';
import ApplicationView from '../pages/ApplicationView.jsx';
import Signup from '../pages/Signup.jsx';

import styles from '../styles/styles.css';

const App = (props) => {

  return <div>
    <h1>React App Starts Here</h1>
    <Login />
    <Signup />
    <Homepage />
    <ApplicationView />
  </div>;
}

export default App;
