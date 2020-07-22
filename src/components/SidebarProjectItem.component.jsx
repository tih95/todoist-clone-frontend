import React from 'react';
import { Box, Text, Stack } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { BsCircleFill } from 'react-icons/bs';
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
				<Stack isInline alignItems="center">
					<BsCircleFill size={8} color={project.color} />
					<Text marginLeft="0.3em" cursor="pointer" textTransform="capitalize">
						{project.name}
					</Text>
				</Stack>
				
			</Link>
		</Box>
	);
};

export default SidebarProjectItem;
