import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TYPES} from '../../../../core/ioc/Types';
import {container} from '../../../../core/ioc/container';
import ConfirmUseCase from '../domain/usecases/ConfirmUseCase';

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

export const confirmUserThunk = createAsyncThunk(
  'users/confirm',
  async (
    _: {email: string; password: string; confirm: string},
    {rejectWithValue},
  ) => {
    try {
      const useCase = container.get<ConfirmUseCase>(TYPES.ConfirmUseCase);
      return await useCase.execute(_.email, _.password, _.confirm);
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
