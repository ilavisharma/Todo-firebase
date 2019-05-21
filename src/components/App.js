import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import firebase from '../lib/firebase';

const App = () => {
  const [todos, updateTodos] = useState([]);
  const db = firebase.firestore();

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => console.log(result))
      .catch(err => console.log('error' + err));
  };

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
      <button onClick={signIn}>Sign In with google</button>
      <h1>To-Do List</h1>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
