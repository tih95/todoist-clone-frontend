import React from 'react';
import {
	AlertDialog,
	AlertDialogFooter,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	AlertDialogHeader
} from '@chakra-ui/core';

const DeleteConfirmationModal = ({ deleteFunction, onClose, isOpen, loadingStatus }) => {
	return (
		<AlertDialog isOpen={isOpen} onClose={onClose}>
			<AlertDialogOverlay />

			<AlertDialogContent>
				<AlertDialogHeader>Are you sure you want to delete?</AlertDialogHeader>

				<AlertDialogFooter>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						isLoading={loadingStatus === 'loading'}
						loadingText="Deleting..."
						variantColor="red"
						onClick={deleteFunction}
						ml={3}
					>
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteConfirmationModal;
