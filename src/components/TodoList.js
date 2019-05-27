import React from 'react';
import Todos from './Todos';

const TodoList = ({ todos }) => {
  return (
    <div
      className="ui big selection list"
      style={{
        width: '50%'
      }}
    >
      {todos.map((todo, index) => (
        <Todos key={index} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
