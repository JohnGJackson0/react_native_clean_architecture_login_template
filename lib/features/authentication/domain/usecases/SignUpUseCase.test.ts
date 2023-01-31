import UserSignUpModel from '../entities/UserSignUpModel';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import SignUpUseCase from './SignUpUseCase';
// Jest Doesn't Allow Mocking Interfaces
import {any, mock} from 'jest-mock-extended';

it('should get sign up from the repository', async () => {
  const signUpModel = new UserSignUpModel(
    'fakeEmail@fakeemail.com',
    'password',
    'authtoken',
    'refreshToken',
  );

  const repo = mock<AuthenticationRepository>();

  repo.userSignUp.calledWith(any(), any()).mockResolvedValue(signUpModel);

  expect(repo.userSignUp).toBeCalledTimes(0);
  const result = await new SignUpUseCase(repo).execute(
    'fakeEmail@fakeEmail.com',
    'fakePassword',
  );

  expect(result).toEqual(signUpModel);
  expect(repo.userSignUp).toBeCalledTimes(1);
  expect(repo.userSignUp).toHaveBeenCalledWith(
    'fakeEmail@fakeEmail.com',
    'fakePassword',
  );
});
