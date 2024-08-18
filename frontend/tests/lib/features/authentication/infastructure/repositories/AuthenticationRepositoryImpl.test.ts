import {mockRepo} from '../../../../../utils/testUtils';
import * as E from 'fp-ts/Either';

describe('Authentication repo', () => {
  describe('UserSignUp', () => {
    it('calls the sign up datasource with the correct email and password as long as it reports right ok', () => {
      const authRepo = mockRepo();

      authRepo.signUpDatasource.getSignUp = jest
        .fn()
        .mockResolvedValue(E.right(''));

      authRepo.userSignUp('fakeEmail@fakeEmail.com', 'fakePassword');

      expect(authRepo.signUpDatasource.getSignUp).toHaveBeenCalledWith(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
      );
      expect(authRepo.signUpDatasource.getSignUp).toHaveBeenCalledTimes(1);
    });

    it('When the datasource returns Left UseCase does as well', async () => {
      const authRepo = mockRepo();
      authRepo.signUpDatasource.getSignUp = jest
        .fn()
        .mockResolvedValue(E.left('error'));

      const userSignUpResult = await authRepo.userSignUp(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
      );

      const result = E.fold(
        error => `error: ${error}`,
        value => value,
      )(userSignUpResult);

      expect(result).toEqual('error: error');
    });

    it('throws when the datasource shows network error', async () => {
      const authRepo = mockRepo();
      authRepo.signUpDatasource.getSignUp = jest
        .fn()
        .mockRejectedValue('Network error');

      let throws = false;
      let message = '';
      try {
        await authRepo.userSignUp('fakeEmail@fakeEmail.com', 'fakePassword');
      } catch (e: any) {
        throws = true;
        message = e;
      }

      expect(throws).toEqual(true);
      expect(message).toEqual('Network error');
    });
  });

  describe('ConfirmUser', () => {
    it('return left when the confirm datasource returns left parameter', async () => {
      const authRepo = mockRepo();

      authRepo.confirmDataSource.getConfirm = jest
        .fn()
        .mockResolvedValue(E.left('fakeError'));

      const confirmUserResponse = await authRepo.confirmUser(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
        'fakeConfirm',
      );

      const test = E.fold(
        error => error,
        value => value,
      )(confirmUserResponse);

      expect(test).toEqual('fakeError');
    });

    it('calls the confirm datasource with the correct email, password and confirm code', async () => {
      const authRepo = mockRepo();

      authRepo.confirmDataSource.getConfirm = jest
        .fn()
        .mockResolvedValue(E.right(''));

      authRepo.confirmUser(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
        'fakeConfirm',
      );

      expect(authRepo.confirmDataSource.getConfirm).toHaveBeenCalledWith(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
        'fakeConfirm',
      );

      expect(authRepo.signUpDatasource.getSignUp).not.toHaveBeenCalled();
    });
  });

  describe('LoginSanity', () => {
    it('calls the login sanity correctly', async () => {
      const authRepo = mockRepo();

      authRepo.loginSanityDatasource.getLoginSanity = jest
        .fn()
        .mockResolvedValue(E.right(''));

      authRepo.getLoginSanity();

      expect(authRepo.loginSanityDatasource.getLoginSanity).toHaveBeenCalled();

      expect(
        authRepo.loginSanityDatasource.getLoginSanity,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('RefreshJwt', () => {
    it('calls the refresh with the correct parameters', () => {
      const authRepo = mockRepo();
      authRepo.refreshDataSource.refreshJwt = jest
        .fn()
        .mockResolvedValue(E.right('refreshed'));

      authRepo.refreshSession();

      expect(authRepo.refreshDataSource.refreshJwt).toHaveBeenCalled();

      expect(authRepo.refreshDataSource.refreshJwt).toHaveBeenCalledTimes(1);
    });
  });

  describe('Logout', () => {
    it('calls the logout with the correct parameters', async () => {
      const authRepo = mockRepo();
      authRepo.logoutDataSource.logout = jest
        .fn()
        .mockResolvedValue(E.right(true));

      await authRepo.logout();

      expect(authRepo.logoutDataSource.logout).toHaveBeenCalledWith();

      expect(authRepo.logoutDataSource.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('Login Repo', () => {
    it('calls reset with the correct paramaters', async () => {
      const authRepo = mockRepo();
      authRepo.loginDataSource.login = jest
        .fn()
        .mockResolvedValue(E.right(true));

      await authRepo.login('fakeEmail@fakeEmail.com', 'fakePassword');

      expect(authRepo.loginDataSource.login).toHaveBeenCalledWith(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
      );

      expect(authRepo.loginDataSource.login).toHaveBeenCalledTimes(1);
    });
  });

  describe('Reset Password Repo', () => {
    it('calls reset with the correct paramaters', async () => {
      const authRepo = mockRepo();
      authRepo.resetPasswordDataSource.resetPassword = jest
        .fn()
        .mockResolvedValue(E.right(true));

      await authRepo.resetPassword('fakeEmail@fakeEmail.com');

      expect(
        authRepo.resetPasswordDataSource.resetPassword,
      ).toHaveBeenCalledWith('fakeEmail@fakeEmail.com');

      expect(
        authRepo.resetPasswordDataSource.resetPassword,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('Confirm Password Reset Repo', () => {
    it('calls confirm password reset datasource with the correct parameters', async () => {
      const authRepo = mockRepo();
      authRepo.confirmChangePasswordDataSource.confirmPasswordReset = jest
        .fn()
        .mockResolvedValue(E.right(true));

      await authRepo.confirmPasswordReset(
        'fakeEmail@fakeEmail.com',
        '123456',
        'fakeNewPassword',
      );

      expect(
        authRepo.confirmChangePasswordDataSource.confirmPasswordReset,
      ).toHaveBeenCalledWith(
        'fakeEmail@fakeEmail.com',
        '123456',
        'fakeNewPassword',
      );

      expect(
        authRepo.confirmChangePasswordDataSource.confirmPasswordReset,
      ).toHaveBeenCalledTimes(1);
    });
  });
});
