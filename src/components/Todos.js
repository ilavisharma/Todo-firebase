import React from 'react';

const Todos = ({ todo }) => {
  const handleCheck = () => {
    console.log('handlecheck');
  };
  return (
    <div className="item">
      <i onClick={handleCheck} className="check icon" />
      {todo}
    </div>
  );
};

export default Todos;
