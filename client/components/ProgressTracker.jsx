import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const ProgressTracker = props => {

  const history = useHistory();

  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
  }, [props, refresh]);

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

  const handleTodoCheck = function(e, id) {
    // e.preventDefault();
    console.log(document.getElementById('todoCheck').checked);
    console.log(e.target.checked);

    // if (e.target.checked) {
      fetch(`/api/applications/${props.appId}/todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          checked: e.target.checked
        })
      })
        .then(res => {
          console.log(res);
          setRefresh(!refresh);
          // history.go(0);
        })
        .catch(err => {
          console.log('err: ',err)
        })
    // }
  }

  let showNotes = notes.sort((first, second) => {
    return first._id > second._id;
  }).map(note => {
    return <div>{note.content}</div>
  })
  
  let showTodos = todos.sort((first, second) => {
    return first._id > second._id;
  }).map(todo => {
    return (
      <li key={todo._id}>
        {todo.content}
        <input 
          type = "checkbox"
          id ="todoCheck"
          className="list-group-item"
          onChange={(e) => handleTodoCheck(e, todo._id)} checked={todo.checked}>
        </input>
      </li>
    );
  })


  return <div id="progress-tracker">
    <div id='todos-view' className="card">
      <ul className='list-group list-group-flush'>
        {showTodos}
      </ul>
    </div>
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
