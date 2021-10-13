import React, {useState, useEffect} from 'react';

const ProgressTracker = props => {

  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log('props changed');
    fetch('/api/getdetails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: props.userId,
        app_id: props.appId,
      })
    })
    .then(res => res.json())
    .then(res => {
      // set notes
      // set todos
    })
  },[props])

  function handleAddTodo(e) {
    e.preventDefault();
    
  }
  function handleAddNote(e) {
    e.preventDefault();
  }


  let showNotes = notes.map(note => {
    return <div></div>
  })


  return <div id="progress-tracker">
    {props.userId}
    {props.appId}
    <button type="button" onClick={(e) => handleAddTodo(e)}>Add New Todo</button>
    <button type="button" onClick={(e) => handleAddNote(e)}>Add New Note</button>
  </div>
}

export default ProgressTracker;
