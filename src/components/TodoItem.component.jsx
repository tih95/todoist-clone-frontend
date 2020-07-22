import React from 'react';
import { Checkbox, Divider, Box } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../features/todos/todosSlice';
import { selectUser } from '../features/user/userSlice';

const TodoItem = ({ todo }) => {
	const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  const chooseColor = () => {
    if (todo.priority === 1) {
      return '#000';
    }
    else if (todo.priority === 2) {
      return '#4299E1';
    }
    else if (todo.priority === 3) {
      return '#ED8936'
    }
    else {
      return '#F56565';
    }
  }

	const handleCheck = async () => {
		const config = {
			headers: {
				Authorization: `bearer ${user.token}`
			}
		};
		const editedTodo = {
			...todo,
			completed: !todo.completed
		};
		console.log(editedTodo);
		await dispatch(updateTodo({ editedTodo, config }));
	};
	return (
		<Box
      color={todo.completed ? '#A0AEC0' : chooseColor()}
    >
			<Checkbox
        isFullWidth
				variantColor="gray"
        textDecor={todo.completed ? 'line-through' : ''}
				isChecked={todo.completed}
				onChange={handleCheck}
			>
				{todo.task}
			</Checkbox>
			<Divider />
		</Box>
	);
};

export default TodoItem;
