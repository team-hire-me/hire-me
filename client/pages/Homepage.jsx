import React, { useState, useEffect } from 'react';
import AppCard from '../components/AppCard.jsx';

const Homepage = (props) => {
  
  function handleSubmit(e) {
    e.preventDefault();
  }

  const displayApps = props.appsList.map((obj, index) => {
    return <AppCard key={index} title={obj.title} company_name={obj.company_name} location={obj.location} description={obj.description} link={obj.link} />;
  });

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
