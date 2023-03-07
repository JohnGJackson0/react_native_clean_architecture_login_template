import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';

export interface SignedUpUserState {
  email: string;
  password: string;
}

export interface SignUpState {
  signedUpUser: SignedUpUserState;
  loading: 'idle' | 'pending';
  error: string;
}

export const initialState = {
  signedUpUser: {email: '', password: ''},
  error: '',
  loading: 'idle',
};

export const signUpUserThunk = createAsyncThunk(
  'users/signUp',
  async (_: {email: string; password: string}, {rejectWithValue}) => {
    try {
      const useCase = AppIOCContainer.get('SignUpUseCase');
      const result = await useCase.execute(_.email, _.password);

      return E.fold(
        error => {
          return rejectWithValue(error);
        },
        value => {
          return value as any;
        },
      )(result);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const SignUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signUpUserThunk.pending, state => {
      state.loading = 'pending';
      state.error = '';
    });
    builder.addCase(signUpUserThunk.fulfilled, (state, action) => {
      state.signedUpUser = action.payload;
      state.loading = 'idle';
    });
    builder.addCase(signUpUserThunk.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.toString();
      }
      state.loading = 'idle';
    });
  },
});

export const SignUpReducer = SignUpSlice.reducer;
