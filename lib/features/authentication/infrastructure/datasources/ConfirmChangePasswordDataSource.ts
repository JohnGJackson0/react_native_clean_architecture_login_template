import * as E from 'fp-ts/Either';
import {ConfirmChangePasswordDataSource} from './datasources.types';
import {EMAIL, JWTTOKEN, REFRESHTOKEN, Storage} from '../storage/storage.types';
import {Client} from '../../../../core/types/client';

interface ApiResponseBody {
  message: string;
}

interface ApiError {
  error: string;
  message: string;
}

export default class ConfirmChangePasswordDataSourceImpl
  implements ConfirmChangePasswordDataSource
{
  client: Client;
  storage: Storage;

  constructor(client: Client, storage: Storage) {
    this.client = client;
    this.storage = storage;
  }

  confirmPasswordReset = async (
    email: string,
    verificationCode: string,
    newPassword: string,
  ): Promise<E.Either<string, string>> => {
    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/confirmReset';
    const payload = {email, verificationCode: verificationCode, newPassword};

    const response = await this.client.request<ApiResponseBody, ApiError>(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });

    const logout = async () => {
      await this.storage.remove(JWTTOKEN);
      await this.storage.remove(EMAIL);
      await this.storage.remove(REFRESHTOKEN);
    };

    const result = E.fold(
      (error: ApiError | string) => {
        if (typeof error === 'string') {
          return E.left(error);
        }

        return E.left(error.error);
      },
      (data: ApiResponseBody) => {
        return E.right(data.message);
      },
    )(response);

    try {
      if (E.isRight(result)) {
        await logout();
      }
    } catch (error: unknown) {
      return result;
    }

    return result;
  };
}
