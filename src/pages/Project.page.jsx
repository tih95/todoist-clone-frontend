import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Box, Flex } from '@chakra-ui/core';
import { selectProjects, selectSelectedProject, setSelectedProject } from '../features/projects/projectsSlice';
import AddTodo from '../components/AddTodo.component';
import TodoList from '../components/TodoList.component';

const Project = ({ match }) => {
	const dispatch = useDispatch();
	const selectedProject = useSelector(selectSelectedProject);
	const todos = useSelector((state) => {
		return state.todos.userTodos.filter((todo) => todo.p_id === selectedProject.p_id);
	});
	const projects = useSelector(selectProjects);

	useEffect(
		() => {
			const currentProject = projects.find((project) => project.name === match.params.projectName);
			console.log(currentProject);
			dispatch(setSelectedProject(currentProject));
		},
		[ projects, match.params.projectName, dispatch ]
	);

	if (!selectedProject) {
		return <div>Loading...</div>;
	}

	return (
		<Box padding="1em">
			<Text textTransform="capitalize" fontWeight="bold" fontSize="1.2em">
				{selectedProject.name}
			</Text>

			<AddTodo selectedProject={selectedProject} />

			<Flex>
				{todos.length === 0 ? (
					<Text width="100%" marginTop="50px" textAlign="center">
						Why don't you add a todo to get started?
					</Text>
				) : (
					<TodoList todos={todos} />
				)}
			</Flex>
		</Box>
	);
};

export default Project;
