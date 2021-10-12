import React from 'react';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';


const Navbar = props => {
  const history = useHistory();
  function handleLogout(e) {
    e.preventDefault();
    fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
        history.push('/');
    });
  }

  return <div>
    <ul>
      <li><Link to={'/homepage'}>Homepage</Link></li>
      <li><Link to={'/applicationview'}>ApplicationView</Link></li>
    </ul>
    <button type="button" onClick={(e) => handleLogout(e)}>Logout</button>
  </div>
}

export default Navbar;
