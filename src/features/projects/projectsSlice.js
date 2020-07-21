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

export const addProject = createAsyncThunk('projects/addProject', async ({ values, config }, { rejectWithValue }) => {

  try {
    const resp = await axios.post('http://localhost:3001/api/projects', values, config);

    return resp.data;
  }
  catch(e) {
    return rejectWithValue(e.response.data);
  }
})

const projectsSlice = createSlice({
	name: 'projects',
	initialState: {
		userProjects: [],
		loading: 'idle',
    error: null,
    selectedProject: null
	},
	reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    }
  },
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
        state.error = null;
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
    },
    [addProject.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'loading';
      }
    },
    [addProject.fulfilled]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        state.userProjects = state.userProjects.concat(action.payload);
        state.error = null;
        
      }
      
    },
    [addProject.rejected]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        if (action.payload) {
          state.error = action.payload.errMsg;
        }
        else {
          console.log('got here');
          state.error = action.error;
        }
      }
    }
	}
});

// ACTIONS
export const { setSelectedProject } = projectsSlice.actions;


// SELECTOR
export const selectProjects = state => state.projects.userProjects;
export const selectSelectedProject = state => state.projects.selectedProject;

export default projectsSlice.reducer;
