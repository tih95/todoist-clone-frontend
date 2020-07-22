import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Project from '../pages/Project.page';

import { fetchProjects } from '../features/projects/projectsSlice';
import { selectUser } from '../features/user/userSlice';
import { fetchTodos } from '../features/todos/todosSlice';
import AllTodos from './AllTodos.page';
import Sidebar from '../components/Sidebar.component';

const TodoApp = ({ match }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(
		() => {
			const setProjectsAndTodos = async () => {
				const config = {
					headers: {
						Authorization: `bearer ${user.token}`
					}
				};
				await dispatch(fetchProjects(config));
				await dispatch(fetchTodos(config));
			};
			setProjectsAndTodos();
		},
		[ user.token, dispatch ]
  );
  return (
    <div>
      <Sidebar />
      <Switch>
        <Route exact path={`${match.path}`} component={AllTodos} />
        <Route exact path={`${match.path}/projects/:projectName`} component={Project} />
      </Switch>
    </div>
  )
}

export default TodoApp;