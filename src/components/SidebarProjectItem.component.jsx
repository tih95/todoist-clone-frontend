import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setSelectedProject } from '../features/projects/projectsSlice';

const SidebarProjectItem = ({ project }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setSelectedProject(project));
	};

	return (
		<Box padding="0.2em 0" onClick={handleClick}>
			<Link to={`/app/projects/${project.name}`}>
				<Text cursor="pointer" textTransform="capitalize">
					{project.name}
				</Text>
			</Link>
		</Box>
	);
};

export default SidebarProjectItem;
