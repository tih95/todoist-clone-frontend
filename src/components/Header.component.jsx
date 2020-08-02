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
	IconButton,
	Menu,
	MenuList,
	MenuGroup,
	MenuItem,
	MenuButton,
	MenuDivider
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { RiMenuLine, RiSettings2Line, RiLogoutBoxRLine, RiAccountPinBoxLine } from 'react-icons/ri';

import { selectUser, resetUser } from '../features/user/userSlice';
import { resetProjects } from '../features/projects/projectsSlice';
import SidebarContent from './SidebarContent.component';
import { resetTodos } from '../features/todos/todosSlice';

const Header = () => {
	const isShrink = useMediaQuery({ query: '(max-width: 750px)' });
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const history = useHistory();

	const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);

	const handleLogout = () => {
		window.localStorage.removeItem('loggedInUser');

		dispatch(resetProjects());
		dispatch(resetTodos());
		dispatch(resetUser());
		history.push('/');
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
				<Menu>
					<MenuButton
						variant="ghost"
						color="white"
						_hover={{ color: '#000', backgroundColor: '#E2E8F0' }}
						as={IconButton}
						icon={RiSettings2Line}
						size="sm"
						fontSize="20px"
					/>
					<MenuList>
						<MenuGroup title="Account">
							<Link to="/account">
								<MenuItem>
									<RiAccountPinBoxLine />
									<Text marginLeft="1em">Account</Text>
								</MenuItem>
							</Link>
						</MenuGroup>
						<MenuDivider />
						<MenuItem onClick={handleLogout}>
							<RiLogoutBoxRLine />
							<Text marginLeft="1em">Log Out</Text>
						</MenuItem>
					</MenuList>
				</Menu>
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
