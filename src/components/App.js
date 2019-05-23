import React from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import Navbar from './Navbar';
import { fetchTodos } from '../actions';

const App = props => {
  const todos = props.todos;
  console.log(todos);
  const renderTodos = () => {
    if (!todos) {
      return <div className="ui active centered inline loader" />;
    } else {
      return <TodoList todos={todos.todos} />;
    }
  };

  return (
    <div className="ui container">
      <Navbar />
      <h1>To-Do List</h1>
      {renderTodos()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    todos: state.todos
  };
};

export default connect(
  mapStateToProps,
  { fetchTodos }
)(App);
