import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BsCircleFill } from 'react-icons/bs';
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
	FormControl,
	useToast
} from '@chakra-ui/core';

import { addProject } from '../features/projects/projectsSlice';
import { selectUser } from '../features/user/userSlice';
import colors from '../utils/colors';

const AddProject = ({ isOpen, onClose }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const loadingStatus = useSelector((state) => state.projects.loading);

	const toast = useToast();
	const formik = useFormik({
		initialValues: {
			name: '',
			color: '#4A5568'
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Must have a name'),
			color: Yup.string().required('Must choose a color')
		}),
		onSubmit: async (values) => {
			const config = {
				headers: {
					Authorization: `bearer ${user.token}`
				}
			};
			const resultAction = await dispatch(addProject({ values, config }));

			if (addProject.fulfilled.match(resultAction)) {
				toast({
					title: 'Successfully added project',
					status: 'success',
					duration: 3000,
					isClosable: true
				});
				formik.resetForm();
				onClose();
				history.push(`/app/projects/${resultAction.payload.name}`);
			}
			else {
				toast({
					title: 'Could not create project',
					status: 'error',
					duration: 3000,
					isClosable: true
				});
			}
		}
	});

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add New Project</ModalHeader>
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
							variantColor="purple"
							type="submit"
							isLoading={loadingStatus === 'loading'}
							loadingText="Adding project..."
							isDisabled={formik.values.name === ''}
						>
							Add Project
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default AddProject;
