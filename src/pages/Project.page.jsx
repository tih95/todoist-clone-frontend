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
			dispatch(setSelectedProject(currentProject));
		},
		[ projects, match.params.projectName, dispatch ]
	);

	if (!selectedProject) {
		return <div>Loading...</div>;
	}

	const notCompletedTodos = todos.filter(todo => !todo.completed);

	const completedTodos = todos.filter(todo => todo.completed);

	return (
		<Box padding="2em" marginLeft="230px">
			<Text marginBottom="1em" textTransform="capitalize" fontWeight="bold" fontSize="1.2em">
				{selectedProject.name}
			</Text>

			<AddTodo selectedProject={selectedProject} />

			<Box>
				{todos.length === 0 ? (
					<Text width="100%" marginTop="50px" textAlign="center">
						Why don't you add a todo to get started?
					</Text>
				) : (
					<React.Fragment>
						<TodoList todos={notCompletedTodos} />
						<TodoList todos={completedTodos} />
					</React.Fragment>
					
				)}
			</Box>
		</Box>
	);
};

export default Project;
