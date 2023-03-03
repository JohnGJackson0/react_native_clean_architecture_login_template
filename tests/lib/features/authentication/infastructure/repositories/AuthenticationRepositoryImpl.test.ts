import {mockRepo} from '../../../../../utils/testUtils';

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

  it('calls the confirm datasource with the correct email, password and confirm code', async () => {
    const authRepo = mockRepo();

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
    authRepo.getRefresh('fakeRefresh');

    expect(authRepo.refreshDataSource.refreshJwt).toHaveBeenCalledWith(
      'fakeRefresh',
    );

    expect(authRepo.refreshDataSource.refreshJwt).toHaveBeenCalledTimes(1);
  });
});
