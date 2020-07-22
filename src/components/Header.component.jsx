import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Text } from '@chakra-ui/core';
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
		<Box
			padding="1em"
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			height="75px"
			backgroundColor="#4A5568"
		>
			<Link to="/">
				<Text color="white" fontSize="1.2em" fontWeight="bold">
					todoist
				</Text>
			</Link>

			{user ? (
				<Button size="sm" onClick={handleLogout}>Log Out</Button>
			) : (
				<Box>
					<Link to="/register">
						<Button size="sm" backgroundColor="#6246ea" _hover={{ backgroundColor: '#806aef' }} color="#fffffe">
							Register
						</Button>
					</Link>
					<Link to="/login">
						<Button size="sm" marginLeft="0.5em" variant="outline" variantColor="purple">Login</Button>
					</Link>
				</Box>
			)}
		</Box>
	);
};

export default Header;
