import React from 'react';
import TodoList from './TodoList';

const App = () => {
  return (
    <div>
      <h1>To-Do List</h1>
      <TodoList todos={['a', 'b', 'c']} />
    </div>
  );
};

export default App;
