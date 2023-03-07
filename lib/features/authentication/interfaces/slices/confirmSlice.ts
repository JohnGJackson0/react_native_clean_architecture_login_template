import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';
import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
interface Tokens {
  jwt: string;
  refresh: string;
}

export interface ConfirmState {
  tokens: Tokens;
  loading: 'idle' | 'pending';
  error: string;
}

export const initialState = {
  tokens: {
    jwt: '',
    refresh: '',
  },
  error: '',
  loading: 'idle',
};

interface ConfirmUserThunkInput {
  email: string;
  password: string;
  confirmCode: string;
}

export const confirmUserThunk = createAsyncThunk(
  'users/confirm',
  async (_: ConfirmUserThunkInput, {rejectWithValue}) => {
    try {
      const useCase = AppIOCContainer.get('ConfirmUseCase');
      const result = (await useCase.execute(
        _.email,
        _.password,
        _.confirmCode,
      )) as E.Either<string, ConfirmDTO>;

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

export const ConfirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(confirmUserThunk.pending, state => {
      state.loading = 'pending';
      state.error = '';
    });
    builder.addCase(confirmUserThunk.fulfilled, (state, action) => {
      // state.tokens = action.payload;
      state.tokens.jwt = action.payload.jwtToken;
      state.tokens.refresh = action.payload.refreshToken;
      state.loading = 'idle';
    });
    builder.addCase(confirmUserThunk.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.toString();
      }
      state.loading = 'idle';
    });
  },
});

export const ConfirmReducer = ConfirmSlice.reducer;
