import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RiMailLine, RiUserLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import {
	Box,
	Input,
	Button,
	FormLabel,
	FormControl,
	Text,
	InputLeftElement,
	InputGroup,
	InputRightElement
} from '@chakra-ui/core';

import { registerUser } from '../features/user/userSlice';

const Register = ({ history }) => {
	const [ showPassword, setShowPassword ] = useState(false);
	const loadingStatus = useSelector(state => state.user.loading);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Must enter a name'),
			email: Yup.string().email('Must be valid email format').required('Must enter an email'),
			password: Yup.string().min(8, 'Must be 8 or more characters').required('Must enter a password')
		}),
		onSubmit: async values => {
			const resultAction = await dispatch(registerUser(values));

			if (registerUser.fulfilled.match(resultAction)) {
				window.localStorage.setItem('loggedInUser', JSON.stringify(resultAction.payload));
				history.push('/');
			}
			else {
				toast.error(resultAction.payload.errMsg);
			}
		}
	});

	return (
		<Box margin="0 auto" maxW="700px" padding="1.5em" color="#2b2c34" backgroundColor="#fffffe">
			<form onSubmit={formik.handleSubmit}>
				<Text fontSize="1.5em" fontWeight="bold" marginBottom="2em">
					Register For An Account
				</Text>
				<FormControl marginBottom="2em">
					<FormLabel htmlFor="name">Name</FormLabel>
					<InputGroup>
						<InputLeftElement>
							<RiUserLine color="#CBD5E0" size={20} />
						</InputLeftElement>
						<Input
							placeholder="John/Jane Doe"
							type="text"
							id="name"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							borderColor={formik.errors.name && formik.touched.name ? '#F56565' : '#E2E8F0'}
						/>
					</InputGroup>

					{formik.errors.name && formik.touched.name ? (
						<Text color="#f56565">{formik.errors.name}</Text>
					) : null}
				</FormControl>

				<FormControl marginBottom="2em">
					<FormLabel htmlFor="email">Email</FormLabel>
					<InputGroup>
						<InputLeftElement>
							<RiMailLine color="#CBD5E0" size={20} />
						</InputLeftElement>
						<Input
							placeholder="joe@domain.com"
							type="email"
							id="email"
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							borderColor={formik.errors.email && formik.touched.email ? '#F56565' : '#E2E8F0'}
						/>
					</InputGroup>
					{formik.errors.email && formik.touched.email ? (
						<Text color="#f56565">{formik.errors.email}</Text>
					) : null}
				</FormControl>

				<FormControl marginBottom="2em">
					<FormLabel htmlFor="password">Password</FormLabel>
					<InputGroup>
						<InputLeftElement>
							<RiLockPasswordLine color="#CBD5E0" size={20} />
						</InputLeftElement>
						<Input
							placeholder="Secure password"
							type={showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							borderColor={formik.errors.password && formik.touched.password ? '#F56565' : '#E2E8F0'}
						/>
						<InputRightElement onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <RiEyeOffLine size={22} /> : <RiEyeLine size={22} />}
						</InputRightElement>
					</InputGroup>
					{formik.errors.password && formik.touched.password ? (
						<Text color="#f56565">{formik.errors.password}</Text>
					) : null}
				</FormControl>

				<Button
					isLoading={loadingStatus === 'loading'}
					loadingText="Registering..."
					width="100%"
					type="submit"
					backgroundColor="#6246ea"
					_hover={{ backgroundColor: '#806aef' }}
					color="#fffffe"
				>
					Register
				</Button>
			</form>
		</Box>
	);
};

export default Register;
