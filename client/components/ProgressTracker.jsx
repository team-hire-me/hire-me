import React from 'react';

const ProgressTracker = props => {

  function handleAddTodo(e) {
    e.preventDefault();
  }
  function handleAddNote(e) {
    e.preventDefault();
  }

  return <div id="progress-tracker">
    <button type="button" onClick={(e) => handleAddTodo(e)}>Add New Todo</button>
    <button type="button" onClick={(e) => handleAddNote(e)}>Add New Note</button>
  </div>
}

export default ProgressTracker;
