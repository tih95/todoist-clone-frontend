import React from 'react';
import { Box } from '@chakra-ui/core';

import TodoItem from './TodoItem.component';

const TodoList = ({ todos }) => {
  return (
    <Box width="100%" n>
      {todos.map(todo => <TodoItem key={todo.t_id} todo={todo} />)}
    </Box>
  )
}

export default TodoList;