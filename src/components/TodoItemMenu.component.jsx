import React, { useState } from 'react';
import { ButtonGroup, IconButton } from '@chakra-ui/core';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import DeleteConfirmationModal from './DeleteConfirmationModal.component';

const TodoItemMenu = ({ deleteTodo, editTodo, disabled }) => {
	const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);
	const loadingStatus = useSelector((state) => state.todos.loading);

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
				loadingStatus={loadingStatus}
			/>
		</ButtonGroup>
	);
};

export default TodoItemMenu;
