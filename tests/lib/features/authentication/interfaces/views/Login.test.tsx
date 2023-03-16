import React from 'react';
import Login from '../../../../../../lib/features/authentication/interfaces/views/Login';
import {fireEvent, render} from '../../../../../utils/render';
import {createScreenTestProps} from '../../../../../utils/testUtils';

describe('login Presentation', () => {
  it('shows elements on page when initially loaded', () => {
    const props = createScreenTestProps();
    const {getByText, getByTestId} = render(<Login {...props} />);
    expect(getByText('Log In')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('navigates to sign up when sign up button is pressed', () => {
    const props = createScreenTestProps();
    const {getByText} = render(<Login {...props} />);
    expect(getByText('Sign Up')).toBeTruthy();
    fireEvent.press(getByText('Sign Up'));
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });
});
