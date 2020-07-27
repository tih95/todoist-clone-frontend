import React from 'react';
import * as Yup from 'yup';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	FormLabel,
	Menu,
	MenuOptionGroup,
	MenuItemOption,
	MenuList,
	MenuButton,
	FormControl
} from '@chakra-ui/core';
import { BsCircleFill } from 'react-icons/bs';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { selectSelectedProject, editProject } from '../features/projects/projectsSlice';

import colors from '../utils/colors';
import { selectUser } from '../features/user/userSlice';

const EditProject = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
	const selectedProject = useSelector(selectSelectedProject);
	const formik = useFormik({
		initialValues: {
			name: selectedProject.name,
			color: selectedProject.color
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Must have a name'),
			color: Yup.string().required('Must choose a color')
    }),
    enableReinitialize: true,
		onSubmit: async (values) => {
      const config = {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      }
      const editedProject = {
        ...values,
        p_id: selectedProject.p_id
      }
     // console.log(editedProject)
      await dispatch(editProject({editedProject, config}));
      formik.resetForm();
      onClose();
    }
	});
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Project</ModalHeader>
				<form onSubmit={formik.handleSubmit}>
					<ModalBody>
						<FormControl>
							<FormLabel htmlFor="name">Project Name</FormLabel>
							<Input
								type="text"
								name="name"
								id="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Choose a color</FormLabel>
							<Menu>
								<MenuButton marginTop="1em" as={Button} variant="outline">
									<BsCircleFill color={formik.values.color} />
								</MenuButton>
								<MenuList maxHeight="300px" width="75px" overflowY="scroll">
									<MenuOptionGroup
										value={formik.values.color}
										name="color"
										onChange={(value) => formik.setFieldValue('color', value)}
										type="radio"
										title="Color"
										defaultValue={'#4A5568'}
									>
										{colors.map((color) => (
											<MenuItemOption value={color} key={color}>
												<BsCircleFill color={color} />
											</MenuItemOption>
										))}
									</MenuOptionGroup>
								</MenuList>
							</Menu>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button mr={3} onClick={onClose}>
							Close
						</Button>
						<Button
							color="white"
							backgroundColor="#6246ea"
							_hover={{ backgroundColor: '#806aef' }}
							type="submit"
						>
							Add Project
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default EditProject;
