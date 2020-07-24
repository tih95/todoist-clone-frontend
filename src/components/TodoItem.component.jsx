import React, { useState } from 'react';
import { Text, Box, Flex, Divider } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RiCalendarLine, RiCheckboxBlankCircleLine, RiCheckboxCircleLine, RiCheckLine } from 'react-icons/ri';
import dayjs from 'dayjs';

import { updateTodo } from '../features/todos/todosSlice';
import { selectUser } from '../features/user/userSlice';

const TodoItem = ({ todo }) => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const [ isCheckBoxHover, setIsCheckBoxHover ] = useState(false);

	const chooseColor = () => {
		if (todo.priority === 1) {
			return '#000';
		}
		else if (todo.priority === 2) {
			return '#4299E1';
		}
		else if (todo.priority === 3) {
			return '#ED8936';
		}
		else {
			return '#F56565';
		}
	};

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
		<Flex cursor="pointer" color={todo.completed ? '#A0AEC0' : chooseColor()} alignItems="center" marginBottom="0.7em">
			{todo.completed ? (
				<RiCheckboxCircleLine onClick={handleCheck} size={22} />
			) : (
				<Box
					onClick={handleCheck}
					onMouseEnter={() => setIsCheckBoxHover(true)}
					onMouseLeave={() => setIsCheckBoxHover(false)}
					as={isCheckBoxHover ? RiCheckLine : RiCheckboxBlankCircleLine}
					size="22px"
				/>
			)}

			<Box marginLeft="1em">
				<Text textDecor={todo.completed ? 'line-through' : ''}>{todo.task}</Text>
				{!todo.due_date ? null : (
          <Flex alignItems="center">
            <RiCalendarLine size={14} />
            <Text marginLeft="0.6em" fontSize="0.7em">{todo.completed ? null : dayjs(todo.due_date).format('MMM D')}</Text>
          </Flex>
					
				)}
			</Box>
		</Flex>
	);
};

export default TodoItem;
