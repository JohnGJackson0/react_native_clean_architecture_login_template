import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {render as rntlRender} from '@testing-library/react-native';
import {SignUpReducer} from '../../lib/features/authentication/interfaces/slices/signUpSlice';
import {ConfirmReducer} from '../../lib/features/authentication/interfaces/slices/confirmSlice';

function render(
  ui: any,
  {
    //@ts-ignore
    preloadedState,
    store = configureStore({
      reducer: {signUp: SignUpReducer, confirm: ConfirmReducer},
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({children}: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rntlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

export * from '@testing-library/react-native';

export {render};
