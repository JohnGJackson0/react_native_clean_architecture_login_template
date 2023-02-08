import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import SignUpUseCase from '../domain/usecases/SignUpUseCase';
import AuthenticationRepositoryImpl from '../data/repositories/AuthenticationRepositoryImpl';
import UserSignUpDataSourceImpl from '../data/datasources/signUpDataSource';
import UserSignUp from '../domain/entities/UserSignUp';
import configureDI from '../../../../core/ioc/container';

export interface signedUpUserState {
  email: string;
  password: string;
}

export interface SignUpState {
  signedUpUser: signedUpUserState;
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
  async (_: UserSignUp, {rejectWithValue}) => {
    try {
      const container = configureDI();

      console.log(
        container.get('UserSignUpDataSource') instanceof
          UserSignUpDataSourceImpl,
      );
      const datasource = new UserSignUpDataSourceImpl({fetch: fetch});
      const repo = new AuthenticationRepositoryImpl(datasource);
      const useCase = new SignUpUseCase(repo);
      return await useCase.execute(_.email, _.password);
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
