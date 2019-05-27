import React, { useState } from 'react';

const Todos = ({ todo }) => {
  const [iconColor, changeColor] = useState('');

  const handleCheck = () => {
    console.log('handlecheck');
  };
  return (
    <div
      className="item"
      onMouseEnter={() => {
        changeColor('red');
      }}
      onMouseLeave={() => changeColor('')}
    >
      <i
        className="check icon"
        style={{
          color: iconColor,
          paddingRight: '15px'
        }}
      />
      {todo}
    </div>
  );
};

export default Todos;
