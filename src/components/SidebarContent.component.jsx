import React, { Suspense, lazy } from 'react';
import { Box, Text, Button, useDisclosure, Flex } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiCalendarLine } from 'react-icons/ri';

import SidebarProjectItem from './SidebarProjectItem.component';
import { selectProjects } from '../features/projects/projectsSlice';
import { selectAllTodos } from '../features/todos/todosSlice';
import dayjs from 'dayjs';

const AddProject = lazy(() => import('./AddProject.component'));

const SidebarContent = () => {
	const projects = useSelector(selectProjects);
	const todos = useSelector(selectAllTodos);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const filteredProjects = projects.filter((project) => project.name !== 'inbox');
	const inbox = projects.find((project) => project.name === 'inbox');

	return (
		<Box marginTop="1em" marginLeft="0.7em">
			<Suspense fallback={<div>Loading...</div>}>
				<AddProject isOpen={isOpen} onClose={onClose} />
			</Suspense>

			<SidebarProjectItem project={inbox} />
			<Box fontSize="1.1em" padding="0.2em 0">
				<Link to="/app/today">
					<Flex alignItems="center">
						<RiCalendarLine />
						<Text marginLeft="0.5em" cursor="pointer">
							Today
						</Text>
						<Text marginLeft="0.5em" color="#A0AEC0" fontSize="0.8em">
							{todos.filter((todo) => dayjs().isSame(dayjs(todo.due_date), 'date') && !todo.completed)
								.length +
								todos.filter((todo) => dayjs().isAfter(dayjs(todo.due_date), 'date') && !todo.completed)
									.length}
						</Text>
					</Flex>
				</Link>
			</Box>

			<Text marginTop="1em" fontWeight="bold">
				Projects
			</Text>
			<Box margin="0.7em 0">
				{filteredProjects.map((project) => <SidebarProjectItem key={project.p_id} project={project} />)}
			</Box>
			<Button variant="link" onClick={onOpen}>
				+ Add project
			</Button>
		</Box>
	);
};

export default SidebarContent;
