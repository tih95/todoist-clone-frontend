import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from './features/user/userSlice';
import Header from './components/Header.component';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import('./pages/Login.page'));
const Register = lazy(() => import('./pages/Register.page'));
const Landing = lazy(() => import('./pages/Landing.page'));
const TodoApp = lazy(() => import('./pages/TodoApp.page'));

function App() {
	const user = useSelector(selectUser);

	console.log('rendering app');
	return (
		<div>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnHover
			/>
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path="/" render={props => (user ? <Redirect to="/app" /> : <Landing />)} />
					<Route path="/app" render={props => user ? <TodoApp {...props} /> : <Redirect to="/login" />} />
					<Route exact path="/login" render={props => user ? <Redirect to="/" /> : <Login />} />
					<Route exact path="/register" render={props => user ? <Redirect to="/"/> : <Register />} />
				</Switch>
			</Suspense>
		</div>
	);
}

export default App;
