import {mockRepo} from '../../../../../utils/testUtils';
import * as E from 'fp-ts/Either';

describe('Authentication repo', () => {
  it('calls the sign datasource with the correct email and password', () => {
    const authRepo = mockRepo();

    authRepo.userSignUp('fakeEmail@fakeEmail.com', 'fakePassword');

    expect(authRepo.signUpDatasource.getSignUp).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );
    expect(authRepo.signUpDatasource.getSignUp).toHaveBeenCalledTimes(1);
  });

  it('throws when datasource returns left parameter', async () => {
    const authRepo = mockRepo();

    authRepo.confirmDataSource.getConfirm = jest
      .fn()
      .mockResolvedValue(E.left('fakeError'));

    let throws = false;
    let message = '';
    try {
      await authRepo.confirmUser(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
        'fakeConfirm',
      );
    } catch (e: any) {
      throws = true;
      message = e;
    }
    expect(throws).toEqual(true);
    expect(message).toEqual('fakeError');
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

  it('calls the login sanity with the correct jwt token', async () => {
    const authRepo = mockRepo();
    authRepo.getLoginSanity('fakeJwt');

    expect(authRepo.loginSanityDatasource.getLoginSanity).toHaveBeenCalledWith(
      'fakeJwt',
    );

    expect(authRepo.loginSanityDatasource.getLoginSanity).toHaveBeenCalledTimes(
      1,
    );
  });

  it('calls the refresh with the correct parameters', () => {
    const authRepo = mockRepo();
    authRepo.refreshDataSource.refreshJwt = jest
      .fn()
      .mockResolvedValue(E.right('refreshed'));

    authRepo.getRefresh('fakeRefresh');

    expect(authRepo.refreshDataSource.refreshJwt).toHaveBeenCalledWith(
      'fakeRefresh',
    );

    expect(authRepo.refreshDataSource.refreshJwt).toHaveBeenCalledTimes(1);
  });
});
