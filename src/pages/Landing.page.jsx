import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Button, Image, Text } from '@chakra-ui/core';
import { useMediaQuery } from 'react-responsive';

import HeroImage from '../assets/undraw_to_do_list_a49b.png';
import DemoImage from '../assets/screencapture-localhost-3000-app-projects-inbox-2020-07-26-17_19_20.png';
import FeatureImage1 from '../assets/undraw_add_tasks_mxew.png';
import FeatureImage2 from '../assets/undraw_to_do_xvvc.png';

const Landing = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

	return (
		<Box margin="0 auto" maxW="1200px">
			<Flex marginTop="2em" flexDir="column" alignItems="center" as="section" padding="1em">
				<Heading textAlign="center" as="h1" fontSize="4em" marginBottom="0.7em">
					Organize it with Todoist
				</Heading>
				<Link to="/register">
					<Button width="auto" variantColor="purple">
						Get Started
					</Button>
				</Link>
				<Image src={HeroImage} alt="hero image" />
			</Flex>

			<Flex marginBottom="75px" as="section" alignItems="center" flexDir="column" textAlign="center">
				<Image
					borderRadius="10px"
					background="#fff"
					boxShadow="9px 9px 34px #dbdbdb"
					src={DemoImage}
					alt="demo image"
					width="70%"
				/>

				<Box padding="1em">
					<Text margin="1em 0" fontSize={isMobile ? '3em' : '4em'} fontWeight="600" lineHeight={1}>
						Free Up Mental Space
					</Text>
					<Text fontSize="1.4em">Regain clarity and calmness by listing out your todos</Text>
				</Box>
			</Flex>

			<Flex
				flexDir={isMobile ? 'column' : 'row'}
				padding={isMobile ? '0 1em' : '0 2em'}
				as="section"
				marginTop="3em"
				marginBottom="4em"
				justifyContent="space-between"
			>
				<Flex flexDir="column" width={isMobile ? '100%' : '55%'}>
					<Text fontSize={isMobile ? '2em' : '3em'} fontWeight="bold">
						A task manager you can trust for life
					</Text>
					<Text marginTop="1.3em" fontSize="1.4em">
						In the 13 years and 178 days that we’ve been building Todoist, we’ve never considered selling
						out or becoming acquired
					</Text>
					<Text marginTop="1.3em" fontSize="1.4em">
						Our team is committed to staying independent and earning your trust for as long as you need our
						apps.
					</Text>
				</Flex>
				<Image width={isMobile ? '100%' : '45%'} height="auto" src={FeatureImage1} alt="feature 1" />
			</Flex>

			<Flex
				flexDir={isMobile ? 'column' : 'row'}
				padding={isMobile ? '0 1em' : '0 2em'}
				as="section"
				marginTop="3em"
				marginBottom="4em"
				justifyContent="space-between"
			>
				<Image width={isMobile ? '100%' : '45%'} height="auto" src={FeatureImage2} alt="feature 2" />
				<Flex flexDir="column" width={isMobile ? '100%' : '55%'}>
					<Text fontSize={isMobile ? '2em' : '3em'} fontWeight="bold">
						Start each day feeling calm and collected
					</Text>
					<Text marginTop="1.5em" fontSize="1.4em">Get a clear view of your day with all your todos listed in one place</Text>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Landing;
