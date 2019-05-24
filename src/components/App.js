import React, { useState } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import Navbar from './Navbar';
import { fetchTodos, addTodo } from '../actions';
import { MySwal } from '../lib/sweetAlert';

const App = props => {
  const [input, changeInput] = useState('');
  const todos = props.todos;

  const checkAuth = () => {
    if (props.isSignedIn === null) {
      return <div className="ui active centered inline loader" />;
    } else if (props.isSignedIn === false) {
      MySwal.fire('You need to sign in');
      return <h1>No data available</h1>;
    } else {
      return renderTodos();
    }
  };

  const renderTodos = () => {
    if (!todos) {
      return <div className="ui active centered inline loader" />;
    } else {
      return <TodoList todos={todos.todos} />;
    }
  };

  const onButtonClick = () => {
    props.addTodo(input);
  };

  return (
    <div className="ui container">
      <Navbar />
      <h1>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={e => changeInput(e.target.value)}
      />
      <button className="ui primary" onClick={onButtonClick}>
        Add todo
      </button>
      {checkAuth()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isSignedIn: state.auth.isSignedIn,
    todos: state.todos
  };
};

export default connect(
  mapStateToProps,
  { fetchTodos, addTodo }
)(App);
