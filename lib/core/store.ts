import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {SignUpReducer} from '../features/authentication/signup/presentation/signUpSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {ConfirmReducer} from '../features/authentication/confirm/presentation/confirmSlice';

const reducers = combineReducers({
  signUp: SignUpReducer,
  confirm: ConfirmReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['signUp'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
