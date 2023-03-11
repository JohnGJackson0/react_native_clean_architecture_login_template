import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {render as rntlRender} from '@testing-library/react-native';
import {HomeReducer} from '../../lib/features/authentication/interfaces/slices/homeSlice';
import {AppReducer} from '../../lib/features/authentication/interfaces/slices/appSlice';
import {Provider as JotaiProvider} from 'jotai';

function render(
  ui: any,
  {
    //@ts-ignore
    preloadedState,
    store = configureStore({
      reducer: {
        home: HomeReducer,
        app: AppReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({children}: any) {
    return (
      <Provider store={store}>
        <JotaiProvider>{children}</JotaiProvider>
      </Provider>
    );
  }
  return rntlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

export * from '@testing-library/react-native';

export {render};
