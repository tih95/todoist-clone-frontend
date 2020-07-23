import React, { Suspense, useEffect, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProjects } from '../features/projects/projectsSlice';
import { selectUser } from '../features/user/userSlice';
import { fetchTodos } from '../features/todos/todosSlice';
import Sidebar from '../components/Sidebar.component';

const Project = lazy(() => import('../pages/Project.page'));
const AllTodos = lazy(() => import('../pages/AllTodos.page'));

const TodoApp = ({ match }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(
		() => {
      console.log('running effect in TodoApp');
			const setProjectsAndTodos = async () => {
				const config = {
					headers: {
						Authorization: `bearer ${user.token}`
					}
        };
        await Promise.all([dispatch(fetchProjects(config)), dispatch(fetchTodos(config))]);
			};
			setProjectsAndTodos();
		},
		[ user.token, dispatch ]
  );
  return (
    <div>
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={`${match.path}`} component={AllTodos} />
          <Route exact path={`${match.path}/projects/:projectName`} component={Project} />
        </Switch>
      </Suspense>
      
    </div>
  )
}

export default TodoApp;