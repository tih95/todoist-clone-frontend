import React from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogContent,
	AlertDialogOverlay,
	Button
} from '@chakra-ui/core';

const DeleteConfirmationModal = ({ deleteFunction, onClose, isOpen }) => {
	return (
		<AlertDialog isOpen={isOpen} onClose={onClose}>
			<AlertDialogOverlay />

			<AlertDialogContent>
				<AlertDialogBody>Are you sure you want to delete?</AlertDialogBody>

				<AlertDialogFooter>
					<Button onClick={onClose}>Cancel</Button>
					<Button variantColor="red" onClick={deleteFunction} ml={3}>
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteConfirmationModal;
