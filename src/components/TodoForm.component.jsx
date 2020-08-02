import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AiFillFlag } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
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
	Text,
	ButtonGroup
} from '@chakra-ui/core';

import 'react-datepicker/dist/react-datepicker.css';

import { selectProjects } from '../features/projects/projectsSlice';
import { selectUser } from '../features/user/userSlice';
import { addTodo, updateTodo } from '../features/todos/todosSlice';
import TodoDatePicker from './TodoDatePicker.component';
import { createConfig } from '../utils/config';

const TodoForm = ({ selectedProject, todo, isEditing, cancelEdit }) => {
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const user = useSelector(selectUser);
	const loadingStatus = useSelector((state) => state.todos.loading);

	const formik = useFormik({
		initialValues: {
			task: isEditing ? todo.task : '',
			priority: isEditing ? todo.priority : 1,
			due_date: isEditing ? todo.due_date : null,
			p_id: isEditing ? todo.p_id : selectedProject.p_id
		},
		validationSchema: Yup.object({
			task: Yup.string().required('Must write todo'),
			priority: Yup.number(),
			due_date: Yup.date().nullable(),
			p_id: Yup.number().required('Must list project')
		}),
		enableReinitialize: true,
		onSubmit: async (values) => {
			const config = createConfig(user);

			if (isEditing) {
				const editedTodo = {
					...values,
					completed: false,
					t_id: todo.t_id
				};
				await dispatch(updateTodo({ editedTodo, config }));
				cancelEdit();
			}
			else {
				const todo = {
					...values
				};
				await dispatch(addTodo({ todo, config }));
				formik.resetForm();
			}
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
					<Flex flexWrap="wrap" alignItems="center" justifyContent="space-between">
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
												<Text marginLeft="0.5em">No Priority</Text>
											</Stack>
										</MenuItemOption>
										<MenuItemOption type="button" value={2}>
											<Stack isInline>
												<AiFillFlag size={20} color="blue" />
												<Text marginLeft="0.5em">Low Priority </Text>
											</Stack>
										</MenuItemOption>
										<MenuItemOption type="button" value={3}>
											<Stack isInline>
												<AiFillFlag size={20} color="orange" />
												<Text marginLeft="0.5em">Medium Priority</Text>
											</Stack>
										</MenuItemOption>
										<MenuItemOption type="button" value={4}>
											<Stack isInline>
												<AiFillFlag size={20} color="red" />
												<Text marginLeft="0.5em"> High Priority</Text>
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
									<Box
										marginRight="0.6em"
										fontSize="8px"
										as={BsCircleFill}
										color={projects.find((project) => project.p_id === formik.values.p_id).color}
									/>
									{
										projects.find((project) => {
											return project.p_id === formik.values.p_id;
										}).name
									}
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
													<Stack isInline alignItems="center">
														<BsCircleFill size={12} color={project.color} />
														<Text marginLeft="1em">{project.name}</Text>
													</Stack>
												</MenuItemOption>
											);
										})}
									</MenuOptionGroup>
								</MenuList>
							</Menu>
							<DatePicker
								customInput={<TodoDatePicker />}
								selected={(formik.values.due_date && new Date(formik.values.due_date)) || null}
								onChange={(value) => formik.setFieldValue('due_date', value)}
							/>
						</Flex>
						<ButtonGroup>
							<Button
								isLoading={loadingStatus === 'loading'}
								loadingText={isEditing ? 'Saving...' : 'Adding todo...'}
								isDisabled={!formik.values.task}
								size="sm"
								variantColor="purple"
								type="submit"
							>
								{isEditing ? 'Save' : 'Add'}
							</Button>
							{isEditing ? (
								<Button size="sm" type="button" onClick={cancelEdit}>
									Cancel
								</Button>
							) : null}
						</ButtonGroup>
					</Flex>
				</Flex>
			</form>
		</Box>
	);
};

export default TodoForm;
