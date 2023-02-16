import AuthenticationRepositoryImpl from './AuthenticationRepositoryImpl';

describe('Authentication repo', () => {
  it('calls the sign datasource with the correct email and password', () => {
    const mockSignUpDataSource = {getSignUp: jest.fn()} as any;
    const mockConfirmDataSource = {confirmUser: jest.fn()} as any;

    const authRepo = new AuthenticationRepositoryImpl(
      mockSignUpDataSource,
      mockConfirmDataSource,
    );

    authRepo.userSignUp('fakeEmail@fakeEmail.com', 'fakePassword');

    expect(mockSignUpDataSource.getSignUp).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );

    expect(mockConfirmDataSource.confirmUser).not.toHaveBeenCalled();
  });

  it('calls the confirm datasource with the correct email, password and confirm code', async () => {
    const mockSignUpDataSource = {getSignUp: jest.fn()} as any;
    const mockConfirmDataSource = {getConfirm: jest.fn()} as any;

    const authRepo = new AuthenticationRepositoryImpl(
      mockSignUpDataSource,
      mockConfirmDataSource,
    );

    authRepo.confirmUser(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'fakeConfirm',
    );

    expect(mockConfirmDataSource.getConfirm).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'fakeConfirm',
    );

    expect(mockSignUpDataSource.getSignUp).not.toHaveBeenCalled();
  });
});
