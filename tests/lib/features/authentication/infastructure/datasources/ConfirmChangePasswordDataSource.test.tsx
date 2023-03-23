import * as E from 'fp-ts/Either';
import {
  ConfirmPasswordResetHappyFixture,
  ConfirmPasswordResetSadFixture,
} from '../../../../../fixtures/ConfirmPasswordResetFixture';
import ConfirmChangePasswordDataSource from '../../../../../../lib/features/authentication/infrastructure/datasources/ConfirmChangePasswordDataSource';

describe('ConfirmChangePassword DataSource', () => {
  it('returns a right|success message when the password is changed', async () => {
    const client = {
      request: jest
        .fn()
        .mockResolvedValue(E.right(ConfirmPasswordResetHappyFixture)),
    };

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const result = await new ConfirmChangePasswordDataSource(
      client,
      storage,
    ).confirmPasswordReset('email', 'password', 'code');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual('Password Reset has been sent to email');
  });

  it('returns correctly when request returns left|string', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.left('error')),
    };

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const result = await new ConfirmChangePasswordDataSource(
      client,
      storage,
    ).confirmPasswordReset('email', 'password', 'code');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual('Error: error');
  });

  it('returns correctly when request returns left|api body', async () => {
    const client = {
      request: jest
        .fn()
        .mockResolvedValue(E.left(ConfirmPasswordResetSadFixture)),
    };

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const result = await new ConfirmChangePasswordDataSource(
      client,
      storage,
    ).confirmPasswordReset('email', 'password', 'code');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual('Error: fakeError');
  });

  it('logs out the user on successful password reset', async () => {
    const client = {
      request: jest
        .fn()
        .mockResolvedValue(E.right(ConfirmPasswordResetHappyFixture)),
    };

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    await new ConfirmChangePasswordDataSource(
      client,
      storage,
    ).confirmPasswordReset('email', 'password', 'code');

    expect(storage.remove).toHaveBeenCalledTimes(3);
    expect(storage.remove).toHaveBeenCalledWith('JWTTOKEN');
    expect(storage.remove).toHaveBeenCalledWith('REFRESHTOKEN');
    expect(storage.remove).toHaveBeenCalledWith('EMAIL');
  });

  it('still returns right|success message on storage failure', async () => {
    const client = {
      request: jest
        .fn()
        .mockResolvedValue(E.right(ConfirmPasswordResetHappyFixture)),
    };

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn().mockResolvedValue(Promise.reject('error')),
    };

    const result = await new ConfirmChangePasswordDataSource(
      client,
      storage,
    ).confirmPasswordReset('email', 'password', 'code');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual('Password Reset has been sent to email');
  });
});
