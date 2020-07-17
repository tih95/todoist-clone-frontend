import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Project from '../pages/Project.page';
import { fetchProjects } from '../features/projects/projectsSlice';
import { selectUser } from '../features/user/userSlice';

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    

    const setProjects = async () => {
      const config = {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      }
      await dispatch(fetchProjects(config));
    }

    setProjects();

  }, [dispatch, user.token]);

  console.log(match.path);
  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`} component={Project} />
      </Switch>
    </div>
  )
}

export default Home;