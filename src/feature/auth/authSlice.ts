import { createSlice } from '@reduxjs/toolkit';
import { decodeJWT } from '../../util/generateFakeJWT';
import type { AuthState } from '../../types/types';

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  if (token) {
    const payload = decodeJWT(token);
    if (payload.exp > Date.now()) {
      return {
        token,
        user: {
          id: payload.sub,
          email: payload.email,
          role: payload.role ?? '',
          assignedProjects:payload.assignedProjects,
          teams:payload.teams
        }
      };
    }
    localStorage.removeItem('token');
  }
  return { token: null, user: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials(state, action) {
      const { token } = action.payload;
      const payload = decodeJWT(token);
      state.token = token;
      state.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        assignedProjects:payload.assignedProjects,
        teams:payload.teams
      };
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
