import React, { useState } from 'react';
import { loginUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine, RiMailLine } from 'react-icons/ri';
import * as Yup from 'yup';
import {
	Box,
	Input,
	Button,
	Text,
	FormControl,
	FormLabel,
	InputLeftElement,
	InputGroup,
	InputRightElement
} from '@chakra-ui/core';
import { toast } from 'react-toastify';

const Login = ({ history }) => {
	const [ showPassword, setShowPassword ] = useState(false);
	const loadingStatus = useSelector((state) => state.user.loading);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Must be valid email format').required('Email is required'),
			password: Yup.string().required('Password is required')
		}),
		onSubmit: async (values) => {
			const resultAction = await dispatch(loginUser(values));

			if (loginUser.fulfilled.match(resultAction)) {
				window.localStorage.setItem('loggedInUser', JSON.stringify(resultAction.payload));
				history.push('/');
			}
			else {
				toast.error(resultAction.payload.errMsg);
			}
		}
	});

	return (
		<Box maxW="700px" margin="0 auto" padding="1.5em" color="#2b2c34" backgroundColor="#fffffe">
			<Text fontSize="1.5em" fontWeight="bold" marginBottom="2em">
				Login
			</Text>
			<form onSubmit={formik.handleSubmit}>
				<FormControl marginBottom="2em">
					<FormLabel htmlFor="email">Email</FormLabel>
					<InputGroup>
						<InputLeftElement>
							<RiMailLine size={20} color="#E2E8F0" />
						</InputLeftElement>
						<Input
							name="email"
							type="email"
							id="email"
							onChange={formik.handleChange}
							value={formik.values.email}
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
							<RiLockPasswordLine size={20} color="#E2E8F0" />
						</InputLeftElement>
						<Input
							name="password"
							type={showPassword ? 'text' : 'password'}
							id="password"
							onChange={formik.handleChange}
							value={formik.values.password}
							onBlur={formik.handleBlur}
							borderColor={formik.errors.email && formik.touched.email ? '#F56565' : '#E2E8F0'}
						/>
						<InputRightElement onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
						</InputRightElement>
					</InputGroup>

					{formik.errors.password && formik.touched.password ? (
						<Text color="#f56565">{formik.errors.password}</Text>
					) : null}
				</FormControl>

				<Button
					backgroundColor="#6246ea"
					_hover={{ backgroundColor: '#806aef' }}
					isLoading={loadingStatus === 'loading'}
					loadingText="Logging In..."
					type="submit"
					color="white"
					width="100%"
				>
					Login
				</Button>
			</form>
		</Box>
	);
};

export default Login;
