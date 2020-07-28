import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHelmet from 'react-helmet';
import { useMediaQuery } from 'react-responsive';
import { Text, Box, MenuButton, Flex, Menu, MenuList, MenuDivider, MenuGroup } from '@chakra-ui/core';
import {
	RiMoreLine,
	RiDeleteBin6Line,
	TiSortAlphabetically,
	AiFillFlag,
	RiCalendarCheckLine,
	RiCheckboxLine,
	RiCheckboxIndeterminateLine,
	RiEdit2Line
} from 'react-icons/all';

import EditProject from '../components/EditProject.component';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.component';
import TodoForm from '../components/TodoForm.component';
import TodoList from '../components/TodoList.component';
import ProjectMenuItem from '../components/ProjectMenuItem.component';

import {
	selectProjects,
	selectSelectedProject,
	setSelectedProject,
	deleteProject
} from '../features/projects/projectsSlice';
import { selectAllTodos, sortTodos } from '../features/todos/todosSlice';
import { selectUser } from '../features/user/userSlice';
import { createConfig } from '../utils/config';

const Project = ({ match, history }) => {
	const dispatch = useDispatch();
	const selectedProject = useSelector(selectSelectedProject);
	const todos = useSelector(selectAllTodos);
	const projects = useSelector(selectProjects);
	const user = useSelector(selectUser);

	const shouldShrink = useMediaQuery({ query: '(max-width: 750px)' });
	const [ showCompleted, setShowCompleted ] = useState(false);
	const [ showEditModal, setShowEditModal ] = useState(false);
	const [ showDeleteModal, setShowDeleteModal ] = useState(false);

	useEffect(
		() => {
			const currentProject = projects.find((project) => project.name === match.params.projectName);
			dispatch(setSelectedProject(currentProject));
		},
		[ projects, match.params.projectName, dispatch ]
	);

	const handleDelete = () => {
		const config = createConfig(user);

		dispatch(deleteProject({ selectedProject, config }));
		history.push('/app');
	};

	const handleSort = (method) => {
		const config = createConfig(user);

		dispatch(sortTodos({ method, config }));
	};

	if (!selectedProject) {
		return <div>Loading...</div>;
	}

	const projectTodos = todos.filter((todo) => todo.p_id === selectedProject.p_id);
	const notCompletedTodos = projectTodos.filter((todo) => !todo.completed);
	const completedTodos = projectTodos.filter((todo) => todo.completed);

	return (
		<Box padding="2em" marginLeft={!shouldShrink ? '230px' : ''}>
			<ReactHelmet>
				<title>{selectedProject.name} | Todoist</title>
			</ReactHelmet>

			<EditProject isOpen={showEditModal} onClose={() => setShowEditModal(!showEditModal)} />
			<DeleteConfirmationModal
				deleteFunction={handleDelete}
				onClose={() => setShowDeleteModal(false)}
				isOpen={showDeleteModal}
			/>

			<Flex justifyContent="space-between" alignItems="center" marginBottom="1em">
				<Text textTransform="capitalize" fontWeight="bold" fontSize="1.4em">
					{selectedProject.name}
				</Text>
				<Menu>
					<MenuButton type="button">
						<RiMoreLine size={24} />
					</MenuButton>
					<MenuList>
						<ProjectMenuItem 
							isDisabled={selectedProject.name === 'inbox'}
							icon={<RiEdit2Line />}
							handleClick={() => setShowEditModal(!showEditModal)}
							label="Edit Project"
						/>
						<MenuDivider />
						<MenuGroup>
							<ProjectMenuItem 
								label="Sort by name"
								handleClick={() => handleSort('name')}
								icon={<TiSortAlphabetically />}
							/>
							<ProjectMenuItem 
								label="Sort by date"
								handleClick={() => handleSort('date')}
								icon={<RiCalendarCheckLine />}
							/>
							<ProjectMenuItem 
								label="Sort by priority"
								handleClick={() => handleSort('priority')}
								icon={<AiFillFlag />}
							/>
						</MenuGroup>

						<MenuDivider />
						<ProjectMenuItem 
							handleClick={() => setShowCompleted(!showCompleted)}
							icon={!showCompleted ? <RiCheckboxLine /> : <RiCheckboxIndeterminateLine />}
							label={showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
						/>
						<MenuDivider />
						<ProjectMenuItem
							label="Delete Project"
							icon={<RiDeleteBin6Line />}
							handleClick={() => setShowDeleteModal(true)}
							isDisabled={selectedProject.name === 'inbox'}
						/>
					</MenuList>
				</Menu>
			</Flex>

			<TodoForm selectedProject={selectedProject} />

			<Box>
				{notCompletedTodos.length === 0 && !showCompleted ? (
					<Text width="100%" marginTop="50px" fontWeight="500" textAlign="center">
						What Will You Accomplish Today?
					</Text>
				) : (
					<React.Fragment>
						<TodoList todos={notCompletedTodos} />
						{showCompleted ? <TodoList todos={completedTodos} /> : null}
					</React.Fragment>
				)}
			</Box>
		</Box>
	);
};

export default Project;
