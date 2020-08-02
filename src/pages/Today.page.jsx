import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHelmet from 'react-helmet';
import { useMediaQuery } from 'react-responsive';
import { Text, Box, Flex } from '@chakra-ui/core';
import dayjs from 'dayjs';

import TodoForm from '../components/TodoForm.component';
import TodoList from '../components/TodoList.component';

import {
	selectProjects,
	selectSelectedProject,
	setSelectedProject,
} from '../features/projects/projectsSlice';
import { selectAllTodos } from '../features/todos/todosSlice';

const Today = () => {
	const dispatch = useDispatch();
	const selectedProject = useSelector(selectSelectedProject);
	const todos = useSelector(selectAllTodos);
	const projects = useSelector(selectProjects);

	const shouldShrink = useMediaQuery({ query: '(max-width: 750px)' });

  
	useEffect(
		() => {
			const currentProject = projects.find((project) => project.name === 'inbox');
			dispatch(setSelectedProject(currentProject));
		},
		[ dispatch, projects ]
	);

  const todayTodos = todos.filter(todo => dayjs().isSame(dayjs(todo.due_date), 'date') && !todo.completed);
  const overDueTodos = todos.filter(todo => dayjs().isAfter(dayjs(todo.due_date), 'date') && !todo.completed);

  if (!selectedProject) {
		return <div>Loading...</div>;
  }
  
	return (
		<Box padding="2em" marginLeft={!shouldShrink ? '230px' : ''}>
			<ReactHelmet>
				<title>Today | Todoist</title>
			</ReactHelmet>

			<Flex alignItems="center" marginBottom="1em">
				<Text textTransform="capitalize" fontWeight="bold" fontSize="1.4em">
					Today
				</Text>
        <Text marginLeft="0.7em" color="gray">{dayjs().format('MMM DD')}</Text>
			</Flex>

			<TodoForm selectedProject={selectedProject} />

			<Box>
				{todayTodos.length === 0 && overDueTodos.length === 0 ? (
					<Text width="100%" marginTop="50px" fontWeight="500" textAlign="center">
						What Will You Accomplish Today?
					</Text>
				) : (
					<React.Fragment>
						<TodoList todos={todayTodos} />

            {overDueTodos.length > 0 ?
              <TodoList todos={overDueTodos} title="Overdue" />
              : null
            }
					</React.Fragment>
				)}
			</Box>
		</Box>
	);
};

export default Today;
