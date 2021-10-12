import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = props => {

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(response => {
      
      console.log(response);
      console.log(response.status)
      if (response.status === 200) {
        history.push("/homepage")
        this.props.authUser = true;
      }
      else{
        history.push("/signup")
      }
      // history.push('/homepage');
    }).catch((err) => {
      console.log('in error');
      console.log(err);
    })


  }
  return (
    <div className="login-form">
      <form id="signin" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group align-items-center">
          <input id="email" name="email" placeholder="email" type="text"></input>
          <br></br>
        </div>
        <input id="pass" name="pass" placeholder="password" type="text"></input>
        <br></br>
        <div className="signin-btnbox">
          <button id="signup-btn" onClick={() => history.push('/signup')} type="button">Sign Up</button>
          <button id="login-btn" formAction="/auth/login" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
