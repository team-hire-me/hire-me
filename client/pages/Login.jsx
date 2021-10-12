import React from 'react';

const Login = props => {
  return <div>
    <form id="signin" method="POST">
      <input id="user" name="user" placeholder="user" type="text"></input>
      <br></br>
      <input id="pass" name="pass" placeholder="pass" type="text"></input>
      <br></br>
      <button id="submit" formaction={"/redirect"/*redirect*/ } type="submit">Sign Up</button>
      <button id="submit" formaction="/auth/login" type="submit">Login</button>
    </form>
  </div>
}

export default Login;
