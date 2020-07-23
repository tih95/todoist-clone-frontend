import React, { lazy, Suspense } from 'react';
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

const AddProject = lazy(() => import('./AddProject.component'));

const Sidebar = () => {
	const projects = useSelector(selectProjects);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const filteredProjects = projects.filter(project => project.name !== 'inbox');
  const inbox = projects.find(project => project.name === 'inbox');
	return (
		<Flex backgroundColor="#F7FAFC" flexDirection="column" position="fixed" marginTop="75px" z-index={1} top={0} left={0} overflowX="hidden" height="100%" width="230px" padding="1em">
			<Box>
        <Suspense fallback={<div>Loading...</div>}>
          <AddProject isOpen={isOpen} onClose={onClose} />
        </Suspense>
        <SidebarProjectItem project={inbox} />
				<Text marginTop="1em" fontWeight="bold">Projects</Text>
				{filteredProjects.map((project) => <SidebarProjectItem key={project.p_id} project={project} />)}
				<Button variant="link" onClick={onOpen}>
					+ Add project
				</Button>
			</Box>
		</Flex>
	);
};

export default Sidebar;
