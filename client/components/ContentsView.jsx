import React from 'react';

const ContentsView = props => {

  return (
    <div>
      {props.app.title}
      <br />
      {props.app.location}
      <br />
      {props.app.company_name}
      <br />
      {props.app.description}
      <br />
      {props.app.link}
      <br />
    </div>
  )
}

export default ContentsView;