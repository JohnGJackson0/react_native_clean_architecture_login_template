import * as E from 'fp-ts/Either';
import {ResendConfirmationCodeDataSource} from './datasources.types';
import {Client} from '../../../../core/types/client';

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
    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/resendConfirmCode';

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
