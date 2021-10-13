import React from 'react';
import { useHistory } from 'react-router-dom';

const ApplicationsTree = props => {
  const history = useHistory();

  const handleOnClick = function (e) {
    e.preventDefault();
    history.push('applicationView/0');
  };

  const handleChangeAppView = function (e, id) {
    e.preventDefault();
    history.push(`/applicationView/${id}`);
  };

  const tree = props.apptree.map((obj, index) => {
    return (
      <a key={index} onClick={(e) => handleChangeAppView(e, obj._id)} href={obj._id}>{obj.title}</a>
    );
  })

  return <div id="applications-tree">
    {tree}
    <button className="btn btn-dark" type="button" onClick={(e) => handleOnClick(e)}>create new application</button>
  </div>
}

export default ApplicationsTree;
