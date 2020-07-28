import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Box,
	Button,
	Text,
	Drawer,
	DrawerOverlay,
	DrawerCloseButton,
	DrawerContent,
	DrawerBody,
	IconButton
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { RiMenuLine } from 'react-icons/ri';

import { selectUser, setUser } from '../features/user/userSlice';
import SidebarContent from './SidebarContent.component';

const Header = () => {
	const isShrink = useMediaQuery({ query: '(max-width: 750px)' });
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	
	const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);

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
			backgroundColor={user ? '#4A5568' : 'white'}
		>
			{isShrink && user ? (
				<IconButton
					onClick={() => setIsDrawerOpen(true)}
					fontSize="23px"
					variant="ghost"
					icon={RiMenuLine}
					color="white"
					size={24}
				/>
			) : null}
			<Drawer isOpen={isDrawerOpen} placement="left" onClose={() => setIsDrawerOpen(false)}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />

					<DrawerBody>
						<SidebarContent />
					</DrawerBody>
				</DrawerContent>
			</Drawer>

			<Link to="/">
				<Text color={user ? 'white' : 'black'} fontSize="1.2em" fontWeight="bold">
					todoist
				</Text>
			</Link>

			{user ? (
				<Button size="sm" onClick={handleLogout}>
					Log Out
				</Button>
			) : (
				<Box>
					<Link to="/register">
						<Button size="sm" variantColor="purple" color="#fffffe">
							Register
						</Button>
					</Link>
					<Link to="/login">
						<Button size="sm" marginLeft="0.5em" variant="outline" variantColor="purple">
							Login
						</Button>
					</Link>
				</Box>
			)}
		</Box>
	);
};

export default Header;
