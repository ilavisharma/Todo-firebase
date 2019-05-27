import React from 'react';
import { connect } from 'react-redux';
import firebase from '../lib/firebase';
import TodoList from './TodoList';
import Navbar from './Navbar';
import { fetchTodos, addTodo } from '../actions';
import { MySwal } from '../lib/sweetAlert';

const App = props => {
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

  // Data change listener
  const doc = firebase.firestore().collection('todos');
  doc.onSnapshot(
    () => props.fetchTodos(),
    err => {
      console.log(err);
    }
  );

  const onButtonClick = async () => {
    const { value: newInput } = await MySwal.fire({
      title: 'Enter the new todo',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return 'You need to write something';
        }
      }
    });

    if (newInput) {
      props.addTodo(newInput);
    }
  };

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
      <div className="ui animated button" onClick={onButtonClick}>
        <div className="visible content">New Todo</div>
        <div className="hidden content">
          <i className="right arrow icon" />
        </div>
      </div>
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
