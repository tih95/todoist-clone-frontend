import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/* THUNKS */
export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user, { rejectWithValue }) => {
		try {
			const resp = await axios.post(
				'http://localhost:3001/api/users/login',
				user
			);

			return resp.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (user, { rejectWithValue }) => {
		try {
			const resp = await axios.post(
				'http://localhost:3001/api/users/register',
				user
			);

			return resp.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		loading: 'idle',
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;
		},
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
				} else {
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
				} else {
					state.error = action.error;
				}
			}
		},
	},
});

export const { setUser } = userSlice.actions;

/* SELECTORS */

// Select currentUser
export const selectUser = (state) => state.user.currentUser;

export default userSlice.reducer;