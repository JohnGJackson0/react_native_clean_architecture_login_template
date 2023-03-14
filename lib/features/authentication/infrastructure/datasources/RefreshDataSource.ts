import {RefreshDataSource} from './datasources.types';
import * as E from 'fp-ts/Either';
import {RefreshDTO} from '../../domain/entities/RefreshDTO';
import {Client} from '../../../../core/types/client';

interface ApiResponse {
  message: string;
  response: {
    ChallengeParameters: {};
    AuthenticationResult: {
      AccessToken: string;
      ExpiresIn: number;
      TokenType: string;
      IdToken: string;
    };
  };
}

interface ApiError {
  error: string;
}

export default class RefreshDataSourceImpl implements RefreshDataSource {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  refreshJwt = async (
    refreshToken: string,
  ): Promise<E.Either<string, RefreshDTO>> => {
    const payload = {
      refreshToken,
    };

    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/refresh';

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
