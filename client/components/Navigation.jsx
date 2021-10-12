import React from 'react';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {Navbar, Container} from 'react-bootstrap';

const Navigation = props => {
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
  const authUser = false;

//   return (
//     <Navbar>
//       <Container>
//         <ul>
//           <li><Link to={'/homepage'}>Homepage</Link></li>
//           <li><Link to={'/applicationview'}>ApplicationView</Link></li>
//         </ul>
//         <button type="button" onClick={(e) => handleLogout(e)}>Logout</button>
//       </Container>
//     </Navbar>
//   );
// }
return (
  <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <div className="container-fluid">
      {/* {NAVBAR BRAND} */}
      <Link to="/homepage">
        <button type="button" className="navbar-brand">
          HomePage
        </button>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* {NAVBAR LEFT} */}
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/homepage" className="nav-link">Home</Link>
          </li>
          {authUser
            ? (
              <li className="nav-item">
                <Link to="/applicationview" className="nav-link"> Applications</Link>
              </li>
            )
            : null}
        </ul>

        {/* {NAVBAR RIGHT} */}

        {authUser
          ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link">Logged in as {username}</span>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">Logout</Link>
              </li>
            </ul>
          )
          : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">Signup</Link>
              </li>
            </ul>
          )}
      </div>
    </div>
  </nav>
);
};
export default Navigation;
