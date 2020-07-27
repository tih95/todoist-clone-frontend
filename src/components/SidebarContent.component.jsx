import React, { Suspense, lazy } from 'react';
import { Box, Text, Button, useDisclosure } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import SidebarProjectItem from './SidebarProjectItem.component';
import { selectProjects } from '../features/projects/projectsSlice';

const AddProject = lazy(() => import('./AddProject.component'));

const SidebarContent = () => {
	const projects = useSelector(selectProjects);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const filteredProjects = projects.filter(project => project.name !== 'inbox');
  const inbox = projects.find(project => project.name === 'inbox');

  return (
    <Box marginTop="1em" marginLeft="0.7em">
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
  )
  
}

export default SidebarContent;