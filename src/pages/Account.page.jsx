import React, { useState } from 'react';
import ReactHelmet from 'react-helmet';
import { useFormik } from 'formik';
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Heading,
	Input,
	FormLabel,
	FormControl,
	Button,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
  ModalCloseButton,
  Text,
	InputLeftElement,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/core';

import { selectUser, editUserInfo, updatePassword } from '../features/user/userSlice';
import { createConfig } from '../utils/config';

const Account = () => {
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const toast = useToast();

	const formik = useFormik({
		initialValues: {
			name: user.name,
			email: user.email
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Must have a name').trim().lowercase(),
			email: Yup.string().email().required('Must have an email').trim().lowercase()
		}),
		enableReinitialize: true,
		onSubmit: async (values) => {
			const config = createConfig(user);

			const editedUser = { ...values };
			const resultAction = await dispatch(editUserInfo({ editedUser, config }));

			if (editUserInfo.fulfilled.match(resultAction)) {
				window.localStorage.setItem('loggedInUser', JSON.stringify(resultAction.payload));
				toast({
					title: 'Successfully updated user info',
					duration: 3000,
					isClosable: true,
					status: 'success'
				});
			}
			else {
				toast({
					title: resultAction.payload.errMsg,
					duration: 3000,
					isClosable: true,
					status: 'error'
				});
			}
		}
	});

	const formikPassword = useFormik({
		initialValues: {
			password: '',
			passwordConf: ''
		},
		validationSchema: Yup.object({
			password: Yup.string().required('Enter new password').min(8, 'Must have more than 8 characters'),
			passwordConf: Yup.string()
				.required('Enter confirmation password')
				.min(8, 'Must have more than 8 characters')
		}),
		onSubmit: async (values) => {
      if (values.password !== values.passwordConf) {
        return toast({
          title: 'Passwords do not match',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }

      const config = createConfig(user);

      try {
        const resultAction = await dispatch(updatePassword({values, config}));

        if (updatePassword.fulfilled.match(resultAction)) {
          window.localStorage.removeItem('loggedInUser');
          toast({
            status: 'success',
            duration: 3000,
            isClosable: true,
            title: 'Successfully updated password'
          })
        }
        else {
          toast({
            status: 'error',
            duration: 3000,
            isClosable: true,
            title: resultAction.action.payload
          })
        }
      }
      catch(e) {

      }
    }
	});

	return (
		<div>
			<ReactHelmet>
				<title>Profile | todoist</title>
			</ReactHelmet>

			<Box maxW="1000px" margin="0 auto" width="80%">
				<Heading margin="1em 0" as="h1">
					Account
				</Heading>

				<Box>
					<form onSubmit={formik.handleSubmit}>
						<FormControl marginBottom="1em">
							<FormLabel htmlFor="name">Name</FormLabel>
							<Input
								type="text"
								id="name"
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FormControl>
						<FormControl marginBottom="1em">
							<FormLabel htmlFor="email">Email</FormLabel>
							<Input
								type="email"
								id="email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FormControl>
						<Button
							variantColor="purple"
							width="100%"
							isDisabled={formik.values.name === user.name && formik.values.email === user.email}
							type="submit"
						>
							Save Changes
						</Button>
					</form>
				</Box>
				<Button
					width="100%"
					marginTop="1em"
					variantColor="purple"
					variant="outline"
					onClick={() => setModalOpen(true)}
				>
					Change Password
				</Button>
				<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
					<ModalOverlay />
					<ModalContent>
						<form onSubmit={formikPassword.handleSubmit}>
							<ModalHeader>Change Password</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<FormControl marginBottom="2em">
									<FormLabel htmlFor="password">New Password</FormLabel>
									<InputGroup>
										<InputLeftElement>
											<RiLockPasswordLine color="#CBD5E0" size={20} />
										</InputLeftElement>
										<Input
											placeholder="Secure password"
											type={showPassword ? 'text' : 'password'}
											id="password"
											name="password"
											value={formikPassword.values.password}
											onChange={formikPassword.handleChange}
											onBlur={formikPassword.handleBlur}
											borderColor={
												formikPassword.errors.password && formikPassword.touched.password ? (
													'#F56565'
												) : (
													'#E2E8F0'
												)
											}
										/>
										<InputRightElement onClick={() => setShowPassword(!showPassword)}>
											{showPassword ? <RiEyeOffLine size={22} /> : <RiEyeLine size={22} />}
										</InputRightElement>
									</InputGroup>
									{formikPassword.errors.password && formikPassword.touched.password ? (
										<Text color="#f56565">{formikPassword.errors.password}</Text>
									) : null}
								</FormControl>

								<FormControl marginBottom="2em">
									<FormLabel htmlFor="password">Confirm Password</FormLabel>
									<InputGroup>
										<InputLeftElement>
											<RiLockPasswordLine color="#CBD5E0" size={20} />
										</InputLeftElement>
										<Input
											placeholder="Secure password"
											type={showPassword ? 'text' : 'password'}
											id="password"
											name="passwordConf"
											value={formikPassword.values.passwordConf}
											onChange={formikPassword.handleChange}
											onBlur={formikPassword.handleBlur}
											borderColor={
												formikPassword.errors.passwordConf && formikPassword.touched.passwordConf ? (
													'#F56565'
												) : (
													'#E2E8F0'
												)
											}
										/>
										<InputRightElement onClick={() => setShowPassword(!showPassword)}>
											{showPassword ? <RiEyeOffLine size={22} /> : <RiEyeLine size={22} />}
										</InputRightElement>
									</InputGroup>
									{formikPassword.errors.passwordConf && formikPassword.touched.passwordConf ? (
										<Text color="#f56565">{formikPassword.errors.passwordConf}</Text>
									) : null}
								</FormControl>

                <Text color="gray" fontStyle="italic">*This will log you out</Text>
							</ModalBody>

							<ModalFooter>
								<Button mr={3} onClick={() => setModalOpen(false)}>
									Close
								</Button>
								<Button variantColor="purple" type="submit">
									Change Password
								</Button>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
			</Box>
		</div>
	);
};

export default Account;
