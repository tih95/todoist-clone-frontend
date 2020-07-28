import React, { Suspense, useEffect, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProjects } from '../features/projects/projectsSlice';
import { selectUser } from '../features/user/userSlice';
import { fetchTodos } from '../features/todos/todosSlice';
import Sidebar from '../components/Sidebar.component';

import { createConfig } from '../utils/config';

const Project = lazy(() => import('../pages/Project.page'));

const TodoApp = ({ match }) => {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	useEffect(
		() => {
			const setProjectsAndTodos = async () => {
				const config = createConfig(user);

				await Promise.all([ dispatch(fetchProjects(config)), dispatch(fetchTodos(config)) ]);
      };
      
			setProjectsAndTodos();
		},
		[ user, dispatch ]
	);

	return (
		<div>
			<Sidebar />
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path={`${match.path}`} render={() => <Redirect to="/app/projects/inbox" />} />
					<Route exact path={`${match.path}/projects/:projectName`} component={Project} />
				</Switch>
			</Suspense>
		</div>
	);
};

export default TodoApp;
