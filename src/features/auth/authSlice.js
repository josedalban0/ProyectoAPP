import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    localId: null,
    profileImage: null, // Nuevo
    location: null,     // Nuevo
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.email;
      state.token = action.payload.idToken;
      state.localId = action.payload.localId;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.localId = null;
      state.profileImage = null;
      state.location = null;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setUserLocation: (state, action) => {
      state.location = action.payload;
    }
  },
});

export const { setUser, clearUser, setProfileImage, setUserLocation } = authSlice.actions;
export default authSlice.reducer;