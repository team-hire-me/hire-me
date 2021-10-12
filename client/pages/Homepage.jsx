import React, { useState, useEffect } from 'react';
import AppCard from '../components/AppCard.jsx';

const Homepage = (props) => {
  const [appsList, setAppsList] = useState([]);

  useEffect(() => {
    fetch('/getUserApplications', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {

      }).catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const displayApps = appsList.map((obj) => <AppCard />);

  return (
    <div>
      <h1>Current Applications</h1>
      <form id="search" onSubmit={(e) => handleSubmit(e)}>
        <input id="searchstr" name="searchstr" placeholder="application title" type="text" />
        <button type="submit">Search</button>
      </form>

      <div id="cards-view">
        {displayApps}
      </div>
    </div>
  );
};

export default Homepage;
