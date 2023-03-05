import {mockClient} from '../../../../../utils/testUtils';
import {
  RefreshErrorFixture,
  RefreshHappyFixture,
} from '../../../../../fixtures/RefreshTokenFixture';
import RefreshDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/RefreshDataSource';
import * as E from 'fp-ts/Either';

describe('refreshTokenDTO', () => {
  it('returns new JWT when response is okay', async () => {
    const expectedConfirm = {
      jwt: 'FakeToken',
    };

    const client = mockClient(RefreshHappyFixture);

    const refreshResult = await new RefreshDataSourceImpl(client).refreshJwt(
      'fakeJwt',
    );

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(refreshResult);

    expect(test).toEqual(expectedConfirm);
  });

  it('throws with correct response when status is not okay', async () => {
    const client = mockClient(RefreshErrorFixture, false);

    const refreshDataSource = await new RefreshDataSourceImpl(
      client,
    ).refreshJwt('token');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(refreshDataSource);

    expect(test).toEqual('Error: User does not exist.');
  });

  it('throws with correct response when network error', async () => {
    const client = mockClient({});
    client.fetch.mockRejectedValue({});

    const refreshDataSource = await new RefreshDataSourceImpl(
      client,
    ).refreshJwt('token');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(refreshDataSource);

    expect(test).toEqual(
      'Error: Cannot fetch the specified resource most likely because of a network error.',
    );
  });
});
