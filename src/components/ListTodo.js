import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const formatDate = (date) => {
  const d = new Date(date);
  let hours = d.getHours();
  let minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${strTime}`;
};

const ListTodo = ({ todos, deleteTodo, editTodo }) => {
  const todoItems = todos.length ? (
    todos.map(todo => (
      <li className="collection-item" key={todo.id}>
        <b>{todo.title}</b>
        <br />
        {todo.description}
        {todo.datetime ? (
          <>
            <br />
            <span style={{ marginTop: '5px' }}>
              <i className="material-icons left red-text">timer</i>
              {formatDate(todo.datetime)}
            </span>
          </>
        ) : null}
        <span role="button" tabIndex={0} className="secondary-content" title="Delete" onClick={() => { deleteTodo(todo.id); }} onKeyDown={() => { deleteTodo(todo.id); }} style={{ cursor: 'pointer' }}>
          <i className="material-icons red-text text-darken-2">delete</i>
        </span>
        <Link to="/add" className="secondary-content" title="Edit" onClick={() => { editTodo(todo); }}><i className="material-icons blue-text">edit</i></Link>
      </li>
    ))
  ) : (<li className="collection-item">Emptiness :)</li>);

  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4>A Simple To-do App</h4>
        </li>
        {todoItems}
      </ul>
      <Link to="/add" className="btn blue waves-effect waves-light">
        <i className="material-icons left">edit</i>
        Create a New To-do
      </Link>
    </div>
  );
};

ListTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default ListTodo;
