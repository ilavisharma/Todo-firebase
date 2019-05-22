import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import Navbar from './Navbar';
import firebase from '../lib/firebase';

const App = () => {
  const [todos, updateTodos] = useState(null);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection('todos')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const { todos: fetchedTodos } = doc.data();
          updateTodos(fetchedTodos);
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }, []);

  const renderTodos = () => {
    if (todos === null) {
      return <div class="ui active centered inline loader" />;
    } else {
      return <TodoList todos={todos} />;
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

export default App;
