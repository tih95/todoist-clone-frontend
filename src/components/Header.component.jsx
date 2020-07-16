import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUser, setUser } from '../features/user/userSlice';

const Header = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const handleLogout = () => {
		window.localStorage.removeItem('loggedInUser');
		dispatch(setUser(null));
	};

	return (
		<Box>
			<Link to="/">TODOIST</Link>

			{user ? (
				<Button onClick={handleLogout}>Log Out</Button>
			) : (
				<React.Fragment>
					<Link to="/register">
						<Button backgroundColor="#6246ea" _hover={{ backgroundColor: '#806aef' }} color="#fffffe">
							Register
						</Button>
					</Link>
					<Link to="/login">
						<Button>Login</Button>
					</Link>
				</React.Fragment>
			)}
		</Box>
	);
};

export default Header;
