import {ConfirmHappyFixture} from '../../../../../fixtures/ConfirmFixture';
import ConfirmDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/ConfirmDataSource';
import {mockClient} from '../../../../../utils/testUtils';

describe('signup', () => {
  it('returns email and password as long as response is ok', async () => {
    const expectedConfirm = {
      refreshToken: 'fakeRefreshToken',
      jwtToken: 'fakeAccessToken',
      email: 'fakeEmail@fakeEmail.com',
    };

    const client = mockClient(ConfirmHappyFixture);

    const signUpResult = await new ConfirmDataSourceImpl(
      client as any,
    ).getConfirm('fakeEmail@fakeEmail.com', 'fakePassword', 'fakeConfirm');

    expect(signUpResult).toEqual(expectedConfirm);
  });

  it('throws with correct response', async () => {
    const client = {
      fetch: jest.fn(() => Promise.reject('fakeError')),
    };

    let thrown = false;
    let response;

    const userSignUpDataSource = new ConfirmDataSourceImpl(client as any);
    try {
      await userSignUpDataSource.getConfirm('', '', '');
    } catch (e) {
      thrown = true;
      response = e;
    }

    expect(thrown).toEqual(true);
    expect(response).toEqual('fakeError');
  });
});
