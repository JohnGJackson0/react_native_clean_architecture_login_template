import {mock} from 'jest-mock-extended';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import * as E from 'fp-ts/Either';
import VerifyStoredAuthTokenUseCase from '../../../../../../lib/features/authentication/domain/usecases/VerifyStoredAuthTokenUseCase';
import {UserAuthInfoDTO} from '../../../../../../lib/features/authentication/domain/entities/UserAuthInfoDTO';

async function testVerifyStoredAuthTokenUseCase(
  authInfoResult: E.Either<string, UserAuthInfoDTO>,
  expectedOutput: boolean,
) {
  const repo = mock<AuthenticationRepository>();
  repo.getUserAuthInfo.mockResolvedValue(authInfoResult);

  const verifyStoredAuthTokenUseCase = await new VerifyStoredAuthTokenUseCase(
    repo,
  ).execute();

  const test = E.fold(
    error => error,
    success => success,
  )(verifyStoredAuthTokenUseCase);

  expect(test).toEqual(expectedOutput);
}

describe('VerifyStoredAuthTokenUseCase', () => {
  it('returns right|true if all tokens are valid', async () => {
    const repo = mock<AuthenticationRepository>();

    repo.getUserAuthInfo.mockResolvedValue(
      E.right({
        jwt: 'fakeJwt',
        email: 'fakeEmail',
        refreshToken: 'fakeRefreshToken',
      }),
    );

    const verifyStoredAuthTokenUseCase = await new VerifyStoredAuthTokenUseCase(
      repo,
    ).execute();

    const test = E.fold(
      error => error,
      success => success,
    )(verifyStoredAuthTokenUseCase);

    expect(test).toEqual(true);
  });

  it('returns right|false if any token is blank', async () => {
    testVerifyStoredAuthTokenUseCase(
      E.right({
        jwt: 'fakeJwt',
        email: 'fakeEmail',
        refreshToken: 'fakeRefreshToken',
      }),
      true,
    );
    testVerifyStoredAuthTokenUseCase(
      E.right({
        jwt: '',
        email: 'fakeEmail',
        refreshToken: 'fakeRefreshToken',
      }),
      false,
    );
    testVerifyStoredAuthTokenUseCase(
      E.right({
        jwt: 'fakeJwt',
        email: '',
        refreshToken: 'fakeRefreshToken',
      }),
      false,
    );
    testVerifyStoredAuthTokenUseCase(
      E.right({
        jwt: 'fakeJwt',
        email: 'fakeEmail',
        refreshToken: '',
      }),
      false,
    );
  });

  it('returns left|error if there is datasource error', async () => {
    const repo = mock<AuthenticationRepository>();
    repo.getUserAuthInfo.mockResolvedValue(E.left('storage error'));

    const verifyStoredAuthTokenUseCase = await new VerifyStoredAuthTokenUseCase(
      repo,
    ).execute();

    const test = E.fold(
      error => error,
      success => success,
    )(verifyStoredAuthTokenUseCase);

    expect(test).toEqual('storage error');
    expect(E.isLeft(verifyStoredAuthTokenUseCase)).toEqual(true);
  });
});
