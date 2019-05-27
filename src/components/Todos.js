import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../actions';

const Todos = props => {
  const { todo } = props;
  const [iconColor, changeColor] = useState('');

  const handleCheck = () => {
    props.deleteTodo(todo);
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
        onClick={handleCheck}
        className="check icon"
        style={{
          color: iconColor,
          paddingRight: '30px'
        }}
      />
      {todo}
    </div>
  );
};

export default connect(
  null,
  { deleteTodo }
)(Todos);
