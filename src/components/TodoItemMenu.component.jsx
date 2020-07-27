import React from 'react';
import { ButtonGroup, IconButton } from '@chakra-ui/core';
import { RiEdit2Line, RiMore2Line, RiArrowRightCircleLine, RiDeleteBin6Line } from 'react-icons/ri';

const TodoItemMenu = ({ deleteTodo, editTodo }) => {
	return (
		<ButtonGroup>
      <IconButton variant="ghost" onClick={editTodo} fontSize="20px" size="sm" icon={RiEdit2Line} />
			<IconButton variant="ghost" onClick={deleteTodo} fontSize="20px" size="sm" icon={RiDeleteBin6Line} />
		</ButtonGroup>
	);
};

export default TodoItemMenu;
