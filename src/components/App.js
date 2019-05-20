import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import firebase from '../lib/firebase';

const App = () => {
  const [todos, updateTodos] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection('todos')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const { todos } = doc.data();
          updateTodos(todos);
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
