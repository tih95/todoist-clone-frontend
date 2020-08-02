import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addProjectApi, deleteProjectApi, editProjectApi, fetchProjectsApi } from '../../api/projects';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (config, { rejectWithValue }) => {
  try {
    const resp = await fetchProjectsApi(config);
    return resp.data;
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
});

export const addProject = createAsyncThunk('projects/addProject', async ({ values, config }, { rejectWithValue }) => {
  try {
    const resp = await addProjectApi(values, config);

    return resp.data;
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
})

export const deleteProject = createAsyncThunk('projects/deleteProject', async ({selectedProject, config}, { rejectWithValue }) => {
  try {
    const resp = await deleteProjectApi(selectedProject, config);

    return resp.data;
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
})

export const editProject = createAsyncThunk('projects/editProject', async ({ editedProject, config }, { rejectWithValue }) => {
  try {
    const resp = await editProjectApi(editedProject, config);

    return resp.data;
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
})

let initialState = {
  userProjects: [],
  loading: 'idle',
  error: null,
  selectedProject: null
}

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    resetProjects: state => initialState
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
          state.error = action.error;
        }
      }
    },
    [deleteProject.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'loading';
      }
    },
    [deleteProject.fulfilled]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        state.userProjects = state.userProjects.filter(project => project.p_id !== action.payload.p_id);
        state.error = null;
        state.selectedProject = state.userProjects.find(project => project.name === 'inbox');
      }
    },
    [deleteProject.rejected]: (state, action) => {
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
    [editProject.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'loading';
      }
    },
    [editProject.fulfilled]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';

        const foundIndex = state.userProjects.findIndex(project => project.p_id === action.payload.p_id);

        state.userProjects[foundIndex] = action.payload; 
        state.error = null;
      }
    },
    [editProject.rejected]: (state, action) => {
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
	}
});

// ACTIONS
export const { setSelectedProject, resetProjects } = projectsSlice.actions;

// SELECTOR
export const selectProjects = state => state.projects.userProjects;
export const selectSelectedProject = state => state.projects.selectedProject;

export default projectsSlice.reducer;
