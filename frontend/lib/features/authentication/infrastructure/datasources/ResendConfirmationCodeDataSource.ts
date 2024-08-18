import * as E from 'fp-ts/Either';
import {ResendConfirmationCodeDataSource} from './datasources.types';
import {Client} from '../../../../core/types/client';
import {API_BASE_URL} from '../../../../../config';

interface ApiResponseBody {
  message: string;
}

interface ApiError {
  error: string;
  message: string;
}

export default class ResendConfirmationCodeDataSourceImpl
  implements ResendConfirmationCodeDataSource
{
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  resendConfirmationCode = async (
    email: string,
  ): Promise<E.Either<string, string>> => {
    const url = `${API_BASE_URL}/resendConfirmCode`;
    const payload = {email};
    const response = await this.client.request<ApiResponseBody, ApiError>(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });

    return E.fold(
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
  };
}
