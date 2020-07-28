import React from 'react';
import { Button } from '@chakra-ui/core';
import { RiCalendarLine } from 'react-icons/ri';

const TodoDatePicker = ({ value, onClick }) => {
	return (
		<Button marginLeft="1em" size="sm" leftIcon={RiCalendarLine} variant="outline" onClick={onClick}>
			{!value ? 'No date' : value}
		</Button>
	);
};

export default TodoDatePicker;
