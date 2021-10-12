import React from 'react';

const ApplicationPreview = (props) => {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div id="application-preview">
      <form id="application-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" placeholder="title" type="text" />
        <br />
        <label htmlFor="company_name">Company Name</label>
        <input id="company_name" name="company_name" placeholder="company_name" type="text" />
        <br />
        <label htmlFor="location">Location</label>
        <input id="location" name="location" placeholder="location" type="text" />
        <br />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" placeholder="description" type="text" />
        <br />
        <button id="submit" formAction="/auth/signup" type="submit">Sign Up</button>
      </form>
    </div>
  )
};

export default ApplicationPreview;
