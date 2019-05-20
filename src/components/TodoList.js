import React from 'react';
import Todos from './Todos';

const TodoList = ({ todos }) => {
  const renderList = () => todos.map(todo => <Todos todo={todo} />);

  return <div className="">{renderList()}</div>;
};

export default TodoList;
