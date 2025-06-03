import { createSlice } from '@reduxjs/toolkit';
import type { Project } from '../../types/types';

interface ProjectState {
  selectedProjectId: string | null;
  filters: {
    status?: Project['status'];
    priority?: Project['priority'];
  };
}

const initialState: ProjectState = {
  selectedProjectId: null,
  filters: {}
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    selectProject(state, action) {
      state.selectedProjectId = action.payload as string;
    },
    clearSelectedProject(state) {
      state.selectedProjectId = null;
    },
    setFilters(state, action) {
      state.filters = action.payload as {
        status?: Project['status'];
        priority?: Project['priority'];
      };
    },
    resetFilters(state) {
      state.filters = {};
    }
  }
});

export const {
  selectProject,
  clearSelectedProject,
  setFilters,
  resetFilters
} = projectSlice.actions;

export default projectSlice.reducer;
