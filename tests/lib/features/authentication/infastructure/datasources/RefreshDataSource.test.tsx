import {mockClient} from '../../../../../utils/testUtils';
import {RefreshHappyFixture} from '../../../../../fixtures/RefreshTokenFixture';
import RefreshDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/RefreshDataSource';

describe('refreshTokenDTO', () => {
  it('returns new JWT when response is okay', async () => {
    const expectedConfirm = {
      jwt: 'FakeToken',
    };

    const client = mockClient(RefreshHappyFixture);

    const refreshResult = await new RefreshDataSourceImpl(client).refreshJwt(
      'fakeJwt',
    );

    expect(refreshResult).toEqual(expectedConfirm);
  });

  it('throws with correct response', async () => {
    const client = {
      fetch: jest.fn(() => Promise.reject('fakeError')),
    };

    let thrown = false;
    let response;

    const refreshDataSource = new RefreshDataSourceImpl(client);
    try {
      await refreshDataSource.refreshJwt('');
    } catch (e) {
      thrown = true;
      response = e;
    }

    expect(thrown).toEqual(true);
    expect(response).toEqual('fakeError');
  });
});
