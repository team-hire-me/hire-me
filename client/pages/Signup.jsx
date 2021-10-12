import React from 'react';

const Signup = props => {
  return <div>
    <form id="signup" method="POST">
    <input id="name" name="name" placeholder="name" type="text"></input>
      <br></br>
      <input id="username" name="username" placeholder="username" type="text"></input>
      <br></br>
      <input id="pass" name="pass" placeholder="pass" type="text"></input>
      <br></br>
      <button id="submit" formaction="/auth/signup" type="submit">Sign Up</button>
    </form>
  </div>
}

export default Signup;