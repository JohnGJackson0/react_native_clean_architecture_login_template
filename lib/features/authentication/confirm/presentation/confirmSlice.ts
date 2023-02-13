import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppIOCContainer} from '../../../../core/ioc/container';

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
  async (_: string, {rejectWithValue}) => {
    try {
      const useCase = AppIOCContainer.get('ConfirmUseCase');
      return await useCase.execute(_);
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
      state.tokens = action.payload;
      state.tokens.jwt = action.payload.jwt;
      state.tokens.refresh = action.payload.refresh;
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
