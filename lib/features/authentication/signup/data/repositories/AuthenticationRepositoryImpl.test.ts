import UserSignUpModel from '../models/UserSignUpModel';
import AuthenticationRepositoryImpl from './AuthenticationRepositoryImpl';

it('calls the datasource with the correct email and password', () => {
  const mockDataSource = {getSignUp: jest.fn(() => UserSignUpModel)} as any;

  const authRepo = new AuthenticationRepositoryImpl(mockDataSource);

  authRepo.userSignUp('fakeEmail@fakeEmail.com', 'fakePassword');

  expect(mockDataSource.getSignUp).toHaveBeenCalledWith(
    'fakeEmail@fakeEmail.com',
    'fakePassword',
  );
});
