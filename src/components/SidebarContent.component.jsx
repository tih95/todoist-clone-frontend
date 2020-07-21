import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Input, FormLabel, ButtonGroup
} from "@chakra-ui/core";

import { selectProjects, addProject } from '../features/projects/projectsSlice';
import { selectUser } from '../features/user/userSlice';
import SidebarProjectItem from './SidebarProjectItem.component';
import { toast } from 'react-toastify';

const SidebarContent = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const user = useSelector(selectUser);
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Must have a name')
    }),
    onSubmit: async values => {
      const config = { 
        headers: {
          Authorization: `bearer ${user.token}`
        }
      }
      console.log('config', config);
      console.log('values', values);
      const resultAction = await dispatch(addProject({values, config}));

      if (addProject.fulfilled.match(resultAction)) {
        toast.success(`Successfully create project ${resultAction.payload.name}`)
        onClose();
      }
      else {
        toast.error('Could not create project')
      }
    }
  })
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box padding="1em">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Project</ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <FormLabel htmlFor="name">Project Name</FormLabel>
              <Input 
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ButtonGroup marginTop="1.5em">
                <Button 
                  mr={3} 
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button 
                  color="white"
                  backgroundColor="#6246ea"
                  _hover={{backgroundColor: '#806aef'}}
                  type="submit"
                >
                  Add Project
                </Button>
              </ButtonGroup>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      
      <Box as="header">
        
      </Box>

      <Box>
        <Text fontWeight="bold">Projects</Text>
        {projects.map(project => 
          <SidebarProjectItem key={project.p_id} project={project} />
        )}
        <Button
          variant="link"
          onClick={onOpen}>+ Add project</Button>
      </Box>
    </Box>
  )
}

export default SidebarContent;