import React from 'react';
import { MenuItem, Box } from '@chakra-ui/core';

const ProjectMenuItem = ({ icon, handleClick, label, isDisabled = false }) => {
	return (
		<MenuItem isDisabled={isDisabled} onClick={handleClick}>
			{icon}
			<Box as="span" marginLeft="1em">
				{label}
			</Box>
		</MenuItem>
	);
};

export default ProjectMenuItem;
