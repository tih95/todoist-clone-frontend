import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loginUserApi, registerUserApi, editUserApi, updatePasswordApi } from '../../api/users';

/* THUNKS */
export const loginUser = createAsyncThunk('user/loginUser', async (user, { rejectWithValue }) => {
	try {
		const resp = await loginUserApi(user);

		return resp.data;
	} 
	catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const registerUser = createAsyncThunk('user/registerUser', async (user, { rejectWithValue }) => {
	try {
		const resp = await registerUserApi(user);

		return resp.data;
	} 
	catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const editUserInfo = createAsyncThunk('user/editUserInfo', async ({editedUser, config}, { rejectWithValue}) => {
	try {
		const resp = await editUserApi(editedUser, config);

		return resp.data;
	}
	catch(e) {
		return rejectWithValue(e.response.data);
	}
})

export const updatePassword = createAsyncThunk('user/updatePassword', async({values, config}, { rejectWithValue }) => {
	try {
		const resp = await updatePasswordApi(values, config);

		return resp.data;
	}
	catch(e) {
		return rejectWithValue(e.response.data);
	}
})

const initialState = {
	currentUser: JSON.parse(window.localStorage.getItem('loggedInUser')),
		loading: 'idle',
		error: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;
		},
		resetUser: state => initialState
	},
	extraReducers: {
		[registerUser.pending]: (state, action) => {
			if (state.loading === 'idle') {
				state.loading = 'loading';
			}
		},
		[registerUser.fulfilled]: (state, action) => {
			if (state.loading === 'loading') {
				state.loading = 'idle';
				state.currentUser = action.payload;
				state.error = null;
			}
		},
		[registerUser.rejected]: (state, action) => {
			if (state.loading === 'loading') {
				state.loading = 'idle';

				if (action.payload) {
					state.error = action.payload.errMsg;
				}
				else {
					state.error = action.error;
				}
			}
		},
		[loginUser.pending]: (state, action) => {
			if (state.loading === 'idle') {
				state.loading = 'loading';
			}
		},
		[loginUser.fulfilled]: (state, action) => {
			if (state.loading === 'loading') {
				state.loading = 'idle';
				state.currentUser = action.payload;
				state.error = null;
			}
		},
		[loginUser.rejected]: (state, action) => {
			if (state.loading === 'loading') {
				state.loading = 'idle';
				if (action.payload) {
					state.error = action.payload.errMsg;
				}
				else {
					state.error = action.error;
				}
			}
		},
		[editUserInfo.pending]: (state, action) => {
			if (state.loading === 'idle') {
				state.loading = 'loading';
			}
		},
		[editUserInfo.fulfilled]: (state, action) => {
			if (state.loading === 'loading') {
				state.loading = 'idle';
				state.currentUser = action.payload;
				state.error = null;
			}
		},
		[editUserInfo.rejected]: (state, action) => {
			if (state.loading === 'loading') {
				state.loading = 'idle';
				if (action.payload) {
					state.error = action.payload.errMsg;
				}
				else {
					state.error = action.error;
				}
			}
		},
		[updatePassword.pending]: (state, action) => {
			if (state.loading === 'idle') {
				state.loading = 'loading';
			}
		},
		[updatePassword.fulfilled]: (state, action) => {
			if (state.loading === 'loading') {
				state.loading = 'idle';
				state.currentUser = null;
				state.error = null;
			}
		},
		[updatePassword.rejected]: (state, action) => {
			if (state.loading === 'loading') {
				state.loading = 'idle';
				if (action.payload) {
					state.error = action.payload.errMsg;
				}
				else {
					state.error = action.error;
				}
			}
		}
	}
});

export const { setUser, resetUser } = userSlice.actions;

/* SELECTORS */

// Select currentUser
export const selectUser = (state) => state.user.currentUser;

export default userSlice.reducer;
