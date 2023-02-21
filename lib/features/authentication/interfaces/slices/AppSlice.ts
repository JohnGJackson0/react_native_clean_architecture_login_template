import {createSlice} from '@reduxjs/toolkit';
export interface AppState {
  jwtToken: string;
  refreshToken: any;
}

const initialState: AppState = {
  jwtToken: '',
  refreshToken: '',
};

interface setUserTokenPayload {
  payload: {
    jwtToken: string;
    refreshToken: string;
  };
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserTokens(state, action: setUserTokenPayload) {
      state.jwtToken = action.payload.jwtToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {setUserTokens} = AppSlice.actions;

export const AppReducer = AppSlice.reducer;
