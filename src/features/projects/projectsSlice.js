import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (config, { rejectWithValue }) => {
  try {
    const res = await axios.get('http://localhost:3001/api/projects', config);
    return res.data;
  }
  catch(e) {
    return rejectWithValue(e.response.data);
  }
});

const projectsSlice = createSlice({
	name: 'projects',
	initialState: {
		userProjects: [],
		loading: 'idle',
		error: null
	},
	reducers: {},
	extraReducers: {
		[fetchProjects.pending]: (state, action) => {
			if (state.loading === 'idle') {
				state.loading = 'loading';
			}
		},
		[fetchProjects.fulfilled]: (state, action) => {
			if (state.loading === 'loading') {
				state.loading = 'idle';
				state.userProjects = action.payload;
			}
		},
		[fetchProjects.rejected]: (state, action) => {
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

// SELECTOR
export const selectProjects = state => state.projects.userProjects;

export default projectsSlice.reducer;
