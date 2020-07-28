import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, Stack } from '@chakra-ui/core';
import { BsCircleFill } from 'react-icons/bs';
import { RiInboxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { selectAllTodos } from '../features/todos/todosSlice';

const SidebarProjectItem = ({ project }) => {
	const todos = useSelector(selectAllTodos);

	if (!project) {
		return null;
	}

	const todoCount = todos.filter((todo) => todo.p_id === project.p_id && !todo.completed).length;

	return (
		<Box fontSize="1.1em" padding="0.2em 0">
			<Link to={`/app/projects/${project.name}`}>
				<Stack isInline alignItems="center">
					{project.name === 'inbox' ? (
						<RiInboxLine size={18} />
					) : (
						<BsCircleFill size={10} color={project.color} />
					)}

					<Text marginLeft="0.5em" cursor="pointer" textTransform="capitalize">
						{project.name}
					</Text>
					<Text color="#A0AEC0" fontSize="0.8em">
						{todoCount}
					</Text>
				</Stack>
			</Link>
		</Box>
	);
};

export default SidebarProjectItem;
