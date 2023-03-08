import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';

interface LoginSanity {
  email: string;
  verifiedEmail: boolean;
}

export interface HomeState {
  loginSanity: LoginSanity;
  loading: 'idle' | 'pending';
  error: string;
}

export const initialState = {
  loginSanity: {
    email: '',
    verifiedEmail: null,
  },
  error: '',
  loading: 'idle',
};

interface LoginSanityThunkInput {
  jwtToken: string;
}

export const LoginSanityThunk = createAsyncThunk(
  'users/loginSanity',
  async (_: LoginSanityThunkInput, {rejectWithValue}) => {
    try {
      const useCase = AppIOCContainer.get('LoginSanityUseCase');
      const result = await useCase.execute(_.jwtToken);

      return E.fold(
        error => {
          return rejectWithValue(error);
        },
        value => value as any,
      )(result);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(LoginSanityThunk.pending, state => {
      state.loading = 'pending';
      state.error = '';
    });
    builder.addCase(LoginSanityThunk.fulfilled, (state, action) => {
      state.loginSanity.email = action.payload.email;
      state.loginSanity.verifiedEmail = action.payload.verifiedEmail;
      state.loading = 'idle';
    });
    builder.addCase(LoginSanityThunk.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.toString();
      }
      state.loading = 'idle';
    });
  },
});

export const HomeReducer = HomeSlice.reducer;
