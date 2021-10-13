import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = props => {
  const [error, setError] = useState([]);
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    (email === '' && password === '') ? setError(['Email and Password needed']) : fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(res => {
      
      if (res.status === 200) {
        history.push('/homepage');
      }
      else if (res.status === 401) {
        history.push('/signup');
      }
      else if (res.status === 400 || res.status === 500) {
        setError(['Wrong Email or Password'])
      } 
      // history.push('/homepage');
    }).catch((err) => {
      console.log('in error');
      console.log(err);
      setError([err]);
    });
  }

  const errView = error.map(err => {
    return <p>{err}</p>
  })

  return (
    <div className="login-form">
      <form id="signin" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group align-items-center">
          <input id="email" name="email" placeholder="email" type="text"></input>
          <br></br>
        </div>
        <input id="pass" name="pass" placeholder="password" type="text"></input>
        <br></br>
        {errView}
        <div className="signin-btnbox">
          <button id="signup-btn" onClick={() => history.push('/signup')} type="button">Sign Up</button>
          <button id="login-btn" formAction="/auth/login" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
