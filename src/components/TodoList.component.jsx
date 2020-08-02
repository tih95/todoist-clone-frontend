import React from 'react';
import { Box, Text } from '@chakra-ui/core';

import TodoItem from './TodoItem.component';

const TodoList = ({ todos, title }) => {
	return (
		<Box width="100%">
			<Text marginTop="1em" fontWeight="bold" marginBottom="0.7em">
				{title}
			</Text>
			{todos.map((todo) => <TodoItem key={todo.t_id} todo={todo} />)}
		</Box>
	);
};

export default TodoList;
