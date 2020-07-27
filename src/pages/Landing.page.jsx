import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Button, Image, Text } from '@chakra-ui/core';

import HeroImage from '../assets/undraw_to_do_list_a49b.png';
import DemoImage from '../assets/screencapture-localhost-3000-app-projects-inbox-2020-07-26-17_19_20.png';
import FeatureImage1 from '../assets/undraw_add_tasks_mxew.png';
import { useMediaQuery } from 'react-responsive';

const Landing = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

	return (
		<Box>
			<Flex marginTop="2em" flexDir="column" alignItems="center" as="section">
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

			<Flex as="section" alignItems="center" flexDir="column" textAlign="center">
				<Image
					borderRadius="10px"
					background="#fff"
					boxShadow="9px 9px 34px #dbdbdb"
					src={DemoImage}
					alt="demo image"
					width="70%"
				/>

				<Box>
					<Text marginTop="1em" fontSize="4em" fontWeight="600">
						Free Up Mental Space
					</Text>
					<Text fontSize="1.2em">Regain clarity and calmness by listing out your todos</Text>
				</Box>
			</Flex>

			<Flex flexDir={isMobile ? 'column' : 'row'} padding="0 2em" as="section" marginTop="3em" marginBottom="4em">
				<Flex flexDir="column" width={isMobile ? '100%' : '50%'}>
					<Text fontSize="3em" fontWeight="bold">
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

			<Box
				fontSize="18px"
				fontWeight="bold"
				paddingTop="1em"
				textAlign="center"
				as="footer"
				width="100%"
				height="100px"
				backgroundColor="#CBD5E0"
			>
				<Text>Made by Tristan Honda</Text>
				<Text>Built with React/Redux, Node/Express, Postgres, ChakraUI</Text>
			</Box>
		</Box>
	);
};

export default Landing;
