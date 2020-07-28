import React, { useState } from 'react';
import { ButtonGroup, IconButton } from '@chakra-ui/core';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import DeleteConfirmationModal from './DeleteConfirmationModal.component';

const TodoItemMenu = ({ deleteTodo, editTodo, disabled }) => {
	const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);

	return (
		<ButtonGroup>
			<IconButton
				isDisabled={disabled}
				variant="ghost"
				onClick={editTodo}
				fontSize="20px"
				size="sm"
				icon={RiEdit2Line}
			/>
			<IconButton
				variant="ghost"
				onClick={() => setIsDeleteOpen(true)}
				fontSize="20px"
				size="sm"
				icon={RiDeleteBin6Line}
			/>

			<DeleteConfirmationModal
				isOpen={isDeleteOpen}
				deleteFunction={deleteTodo}
				onClose={() => setIsDeleteOpen(false)}
			/>
		</ButtonGroup>
	);
};

export default TodoItemMenu;
