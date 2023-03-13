import React, {PropsWithChildren} from 'react';
import {Provider as JotaiProvider} from 'jotai';
import {render as rntlRender} from '@testing-library/react-native';

function render(ui: React.ReactElement, {...renderOptions} = {}) {
  function Wrapper({children}: PropsWithChildren<{}>) {
    return <JotaiProvider>{children}</JotaiProvider>;
  }
  return rntlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

export * from '@testing-library/react-native';

export {render};
