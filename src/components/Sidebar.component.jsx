import React from 'react';
import { useSelector } from 'react-redux';
import {
	useDisclosure,
	Button,
	Box,
  Text,
  Flex
} from '@chakra-ui/core';

import { selectProjects } from '../features/projects/projectsSlice';
import SidebarProjectItem from './SidebarProjectItem.component';
import AddProject from './AddProject.component';

const SidebarContent = () => {
	const projects = useSelector(selectProjects);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex backgroundColor="#F7FAFC" flexDirection="column" position="fixed" marginTop="75px" z-index={1} top={0} left={0} overflowX="hidden" height="100%" width="230px" padding="1em">
			<Box>
        <AddProject isOpen={isOpen} onClose={onClose} />
				<Text fontWeight="bold">Projects</Text>
				{projects.map((project) => <SidebarProjectItem key={project.p_id} project={project} />)}
				<Button variant="link" onClick={onOpen}>
					+ Add project
				</Button>
			</Box>
		</Flex>
	);
};

export default SidebarContent;
