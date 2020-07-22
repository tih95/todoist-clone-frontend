import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AiFillFlag } from 'react-icons/ai';
import {
	Box,
	Input,
	Button,
	Flex,
	Menu,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
	MenuButton,
	Stack,
	Text
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { selectProjects } from '../features/projects/projectsSlice';
import { selectUser } from '../features/user/userSlice';
import { addTodo } from '../features/todos/todosSlice';

const AddTodo = ({ selectedProject }) => {
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const user = useSelector(selectUser);

	const formik = useFormik({
		initialValues: {
			task: '',
			priority: 1,
			due_date: null,
			p_id: selectedProject.p_id
		},
		validationSchema: Yup.object({
			task: Yup.string().required('Must write todo'),
			priority: Yup.number(),
			due_date: Yup.date().nullable(),
			p_id: Yup.number().required('Must list project')
		}),
		enableReinitialize: true,
		onSubmit: async (values) => {
			const todo = {
				...values
			};

			const config = {
				headers: {
					Authorization: `bearer ${user.token}`
				}
			};
			dispatch(addTodo({ todo, config }));
			formik.resetForm();
		}
	});

	return (
		<Box marginBottom="1.5em">
			<form onSubmit={formik.handleSubmit}>
				<Flex borderRadius="5px" padding="0.5em 1em 1em 1em" flexDirection="column" border="1px solid #E2E8F0">
					<Input
						size="sm"
						padding="0"
						border="none"
						name="task"
						type="text"
						value={formik.values.task}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder="Walk dog"
						width="100%"
						marginBottom="0.4em"
					/>
					<Flex alignItems="center" justifyContent="space-between">
						<Flex alignItems="center">
							<Menu>
								<MenuButton type="button">
									<AiFillFlag
										size={22}
										color={
											formik.values.priority === 1 ? (
												'gray'
											) : formik.values.priority === 2 ? (
												'blue'
											) : formik.values.priority === 3 ? (
												'orange'
											) : (
												'red'
											)
										}
									/>
								</MenuButton>
								<MenuList placement="bottom-start">
									<MenuOptionGroup
										value={formik.values.priority}
										name="priority"
										onChange={(value) => formik.setFieldValue('priority', value)}
										title="Priority Level"
										type="radio"
									>
										<MenuItemOption type="button" value={1}>
											<Stack isInline>
												<AiFillFlag size={20} color="gray" />
												<Text>No Priority</Text>
											</Stack>
										</MenuItemOption>
										<MenuItemOption type="button" value={2}>
											<Stack isInline>
												<AiFillFlag size={20} color="blue" />
												<Text>Low Priority </Text>
											</Stack>
										</MenuItemOption>
										<MenuItemOption type="button" value={3}>
											<Stack isInline>
												<AiFillFlag size={20} color="orange" />
												<Text>Medium Priority</Text>
											</Stack>
										</MenuItemOption>
										<MenuItemOption type="button" value={4}>
											<Stack isInline>
												<AiFillFlag size={20} color="red" />
												<Text> High Priority</Text>
											</Stack>
										</MenuItemOption>
									</MenuOptionGroup>
								</MenuList>
							</Menu>
							<Menu>
								<MenuButton
									textTransform="capitalize"
									type="button"
									variant="outline"
									as={Button}
									size="sm"
									marginLeft="1em"
								>
									{projects.find((project) => project.p_id === formik.values.p_id).name}
								</MenuButton>
								<MenuList placement="bottom-start">
									<MenuOptionGroup
										value={formik.values.p_id}
										name="p_id"
										onChange={(value) => formik.setFieldValue('p_id', value)}
										title="Select Project"
										type="radio"
									>
										{projects.map((project) => {
											return (
												<MenuItemOption
													key={project.p_id}
													textTransform="capitalize"
													type="button"
													value={project.p_id}
												>
													{project.name}
												</MenuItemOption>
											);
										})}
									</MenuOptionGroup>
								</MenuList>
							</Menu>
						</Flex>
						<Button size="sm" variantColor="purple" type="submit">
							Add
						</Button>
					</Flex>
				</Flex>
			</form>
		</Box>
	);
};

export default AddTodo;
