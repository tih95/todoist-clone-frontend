import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser, setUser } from './features/user/userSlice';
import Header from './components/Header.component';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import('./pages/Login.page'));
const Register = lazy(() => import('./pages/Register.page'));
const Landing = lazy(() => import('./pages/Landing.page'));
const Home = lazy(() => import('./pages/Home.page'));

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem('loggedInUser');

		if (loggedInUser) {
			const parsedUser = JSON.parse(loggedInUser);
			dispatch(setUser(parsedUser));
		}
	}, [dispatch]);

	console.log('user', user);
	return (
		<div>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnHover
			/>
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path="/" render={() => user ? <Redirect to="/home" /> : <Landing />} />
					<Route exact path="/home" render={props => user ? <Home {...props} /> : <Redirect to="/login" />} />
					<Route exact path="/login" render={props => user ? <Redirect to="/home" /> : <Login />} />
					<Route exact path="/register" render={props => user ? <Redirect to="/home"/> : <Register />} />
				</Switch>
			</Suspense>
		</div>
	);
}

export default App;
