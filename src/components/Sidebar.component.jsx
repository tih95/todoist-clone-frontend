import React from 'react';
import { Flex } from '@chakra-ui/core';
import { useMediaQuery } from 'react-responsive';
import SidebarContent from './SidebarContent.component';

const Sidebar = () => {
	const shouldShrink = useMediaQuery({ query: '(max-width: 750px)' });

	if (shouldShrink) {
		return null;
	}

	return (
		<Flex
			backgroundColor="#F7FAFC"
			flexDirection="column"
			position="fixed"
			marginTop="75px"
			z-index={1}
			top={0}
			left={0}
			overflowX="hidden"
			height="100%"
			width="230px"
			padding="1em"
		>
			<SidebarContent />
		</Flex>
	);
};

export default Sidebar;
