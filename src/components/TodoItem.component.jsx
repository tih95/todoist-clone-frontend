import React from 'react';

const TodoItem = ({ todo }) => {
  return (
    <div>
      {todo.task}
    </div>
  )
}

export default TodoItem;