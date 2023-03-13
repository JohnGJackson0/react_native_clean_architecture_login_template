import React from 'react';
import {Provider as JotaiProvider} from 'jotai';

function render() {
  function Wrapper({children}: any) {
    return <JotaiProvider>{children}</JotaiProvider>;
  }
  return Wrapper;
}

export * from '@testing-library/react-native';

export {render};
