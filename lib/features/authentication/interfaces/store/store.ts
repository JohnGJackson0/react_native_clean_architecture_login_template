import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {SignUpReducer} from '../slices/signUpSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {ConfirmReducer} from '../slices/confirmSlice';
import {AppReducer} from '../slices/appSlice';
import {HomeReducer} from '../slices/homeSlice';

const reducers = combineReducers({
  signUp: SignUpReducer,
  confirm: ConfirmReducer,
  app: AppReducer,
  home: HomeReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['signUp', 'confirm', 'home'],
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
