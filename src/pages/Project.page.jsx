import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Box, MenuButton, Flex, Menu, MenuItem, MenuList, MenuDivider, MenuGroup } from '@chakra-ui/core';
import {
	selectProjects,
	selectSelectedProject,
	setSelectedProject,
	deleteProject
} from '../features/projects/projectsSlice';
import {
	RiMoreLine,
	RiDeleteBin6Line,
	TiSortAlphabetically,
	AiFillFlag,
	RiCalendarCheckLine,
	RiCheckboxLine,
	RiCheckboxIndeterminateLine
} from 'react-icons/all';
import AddTodo from '../components/AddTodo.component';
import TodoList from '../components/TodoList.component';

import { selectAllTodos, sortTodos } from '../features/todos/todosSlice';
import { selectUser } from '../features/user/userSlice';

const Project = ({ match, history }) => {
	const dispatch = useDispatch();
	const selectedProject = useSelector(selectSelectedProject);
	const todos = useSelector(selectAllTodos);
	const projects = useSelector(selectProjects);
	const user = useSelector(selectUser);
	const [ showCompleted, setShowCompleted ] = useState(false);

	useEffect(
		() => {
			const currentProject = projects.find((project) => project.name === match.params.projectName);
			dispatch(setSelectedProject(currentProject));
		},
		[ projects, match.params.projectName, dispatch ]
	);

	if (!selectedProject) {
		return <div>Loading...</div>;
	}

	const handleDelete = () => {
		const config = {
			headers: {
				Authorization: `bearer ${user.token}`
			}
		};

		dispatch(deleteProject({ selectedProject, config }));
		history.push('/app');
	};

	const handleSort = (method) => {
		const config = {
			headers: {
				Authorization: `bearer ${user.token}`
			}
		}

		dispatch(sortTodos({method, config}))
	}

	const projectTodos = todos.filter((todo) => todo.p_id === selectedProject.p_id);
	const notCompletedTodos = projectTodos.filter((todo) => !todo.completed);
	const completedTodos = projectTodos.filter((todo) => todo.completed);

	return (
		<Box padding="2em" marginLeft="230px">
			<Flex justifyContent="space-between" alignItems="center" marginBottom="1em">
				<Text textTransform="capitalize" fontWeight="bold" fontSize="1.4em">
					{selectedProject.name}
				</Text>
				<Menu>
					<MenuButton type="button">
						<RiMoreLine size={24} />
					</MenuButton>
					<MenuList>
						<MenuGroup>
							<MenuItem onClick={() => handleSort('name')}>
								<TiSortAlphabetically />
								<Box as="span" marginLeft="1em">
									Sort by name
								</Box>
							</MenuItem>
							<MenuItem onClick={() => handleSort('date')}>
								<RiCalendarCheckLine />
								<Box as="span" marginLeft="1em">
									Sort by date
								</Box>
							</MenuItem>
							<MenuItem onClick={() => handleSort('priority')}>
								<AiFillFlag />
								<Box as="span" marginLeft="1em">
									Sort by priority
								</Box>
							</MenuItem>
						</MenuGroup>

						<MenuDivider />
						<MenuItem onClick={() => setShowCompleted(!showCompleted)}>
							<Box as={!showCompleted ? RiCheckboxLine : RiCheckboxIndeterminateLine} />
							<Box as="span" marginLeft="1em">
								{showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
							</Box>
						</MenuItem>
						<MenuDivider />
						{selectedProject.name === 'inbox' ? null : (
							<MenuItem onClick={handleDelete}>
								<RiDeleteBin6Line />
								<Box as="span" marginLeft="1em">
									Delete Project
								</Box>
							</MenuItem>
						)}
					</MenuList>
				</Menu>
			</Flex>

			<AddTodo selectedProject={selectedProject} />

			<Box>
				{notCompletedTodos.length === 0 ? (
					<Text width="100%" marginTop="50px" textAlign="center">
						Why don't you add a todo to get started?
					</Text>
				) : (
					<React.Fragment>
						<TodoList todos={notCompletedTodos} />
						{showCompleted ? <TodoList todos={completedTodos} /> : null}
					</React.Fragment>
				)}
			</Box>
		</Box>
	);
};

export default Project;
