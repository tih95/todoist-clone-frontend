import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/core';

import { selectUser } from './features/user/userSlice';

import Header from './components/Header.component';

const Login = lazy(() => import('./pages/Login.page'));
const Register = lazy(() => import('./pages/Register.page'));
const Landing = lazy(() => import('./pages/Landing.page'));
const TodoApp = lazy(() => import('./pages/TodoApp.page'));
const Account = lazy(() => import('./pages/Account.page'));

function App() {
	const user = useSelector(selectUser);

	return (
		<Box position="relative" minH="100%">
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path="/" render={(props) => (user ? <Redirect to="/app" /> : <Landing />)} />
					<Route path="/app" render={(props) => (user ? <TodoApp {...props} /> : <Redirect to="/login" />)} />
					<Route exact path="/login" render={(props) => (user ? <Redirect to="/" /> : <Login />)} />
					<Route exact path="/register" render={(props) => (user ? <Redirect to="/" /> : <Register />)} />
					<Route exact path="/account" render={(props) => (user ? <Account /> : <Redirect to="/login" />)} />
				</Switch>
			</Suspense>
		</Box>
	);
}

export default App;
