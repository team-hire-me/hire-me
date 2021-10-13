import React from 'react';

const CreateApplicationForm = (props) => {

  function handleSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const company_name = document.getElementById('company_name').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    const link = document.getElementById('link').value;

    fetch('/api/createApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        company_name,
        location,
        description,
        link,
      }),
    }).then((response) => {
      console.log(response);
      console.log(response.status);
    }).catch((err) => {
      console.log('in error');
      console.log(err);
    });
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
        <label htmlFor="link">Job Posting Url Link</label>
        <input id="link" name="link" placeholder="link" type="text" />
        <br />
        <button id="submit" formAction="/auth/signup" type="submit">Create Application</button>
      </form>
    </div>
  );
}

export default CreateApplicationForm;