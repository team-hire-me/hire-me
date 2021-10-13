import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const ProgressTracker = props => {

  const history = useHistory();

  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log('props changed');
    console.log(props.appId);
    console.log(props.userId);

    if (props.appId !== undefined) {
      fetch(`/api/applications/${props.appId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          // set notes
          console.log('notes: ',res);
          setNotes(res.notes);
          setTodos(res.todos);
        });
    }
  }, [props]);

  function handleAddTodo(e) {
    e.preventDefault();
    const content = document.getElementById('todos-content').value;

    if (content !== '') {
      fetch(`/api/applications/${props.appId}/todos`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      })
        .then(res => {
          if (res.status === 200) {
            history.push(`/applicationView/${props.appId}`);
          }
        });
    }
  }
  function handleAddNote(e) {
    e.preventDefault();
    const content = document.getElementById('notes-content').value;

    if (content !== '') {
      console.log('adding note');
      fetch(`/api/applications/${props.appId}/notes`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
        }),
      })
        .then(res => {
          if (res.status === 200) {
            console.log('refresh');
            history.push(`/applicationView/${props.appId}`);
          }
        });
    }
  }


  let showNotes = notes.map(note => {
    return <div>{note.content}</div>
  })
  
  let showTodos = todos.map(todo => {
    return <div>{todo.content}</div>
  })


  return <div id="progress-tracker">
    {showTodos}
    <form onSubmit={(e) => handleAddTodo(e)}>
      <textarea type="text" id="todos-content"></textarea>
      <br />
      <button type="submit">Add New Todo</button>
    </form>
    {showNotes}
    <form onSubmit={(e) => handleAddNote(e)}>
      <textarea type="text" id="notes-content"></textarea>
      <br />
      <button type="submit" >Add New Note</button>
    </form>
  </div>
}

export default ProgressTracker;
