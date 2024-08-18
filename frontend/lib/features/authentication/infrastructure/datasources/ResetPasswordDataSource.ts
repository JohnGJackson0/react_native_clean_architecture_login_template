import {ResetPasswordDataSource} from './datasources.types';
import * as E from 'fp-ts/Either';
import {RefreshDTO} from '../../domain/entities/RefreshDTO';
import {Client} from '../../../../core/types/client';
import {API_BASE_URL} from '../../../../../config';

interface ApiResponse {
  message: string;
}

interface ApiError {
  message: string;
  error: string;
}

export default class ResetPasswordDataSourceImpl
  implements ResetPasswordDataSource
{
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  resetPassword = async (
    email: string,
  ): Promise<E.Either<string, RefreshDTO>> => {
    const url = `${API_BASE_URL}/reset`;

    const payload = {
      email,
    };

    const response = await this.client.request<ApiResponse, ApiError>(url, {
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
      (_data: ApiResponse) => {
        return E.right(true);
      },
    )(response);
  };
}
