import React from 'react';
import {createScreenTestProps} from '../../../../../utils/testUtils';
import {fireEvent, render} from '../../../../../utils/render';
import Welcome from '../../../../../../lib/features/authentication/interfaces/views/Welcome';

describe('Welcome Presentation', () => {
  it('navigates to login', () => {
    const props = createScreenTestProps();
    const {getByText} = render(<Welcome {...props} />);
    fireEvent.press(getByText('Login'));
    expect(props.navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('navigates to sign up', () => {
    const props = createScreenTestProps();
    const {getByText} = render(<Welcome {...props} />);
    fireEvent.press(getByText('Sign Up'));
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });
});
