import React from 'react';
import TodoItem from './TodoItem.component';

const TodoList = ({ todos }) => {
  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.t_id} todo={todo} />)}
    </div>
  )
}

export default TodoList;