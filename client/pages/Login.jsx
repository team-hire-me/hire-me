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
        email, password
      }),
    }).then(response => {
      
      // console.log(response);
      // console.log(response.status)
      // if (response.status === 200) {
      //   history.push("/homepage")
      // }
      // else{
      //   history.push("/signup")
      // }
      history.push('/homepage');
    }).catch((err) => {
      console.log('in error')
      console.log(err);
    })


  }
  return <div>
    <form id="signin" onSubmit={(e) => handleSubmit(e)}>
      <input id="email" name="email" placeholder="email" type="text"></input>
      <br></br>
      <input id="pass" name="pass" placeholder="pass" type="text"></input>
      <br></br>
      <button id="submit" onClick={() => history.push('/signup')} type="button">Sign Up</button>
      <button id="submit" formAction="/auth/login" type="submit">Login</button>
    </form>
  </div>
}

export default Login;
