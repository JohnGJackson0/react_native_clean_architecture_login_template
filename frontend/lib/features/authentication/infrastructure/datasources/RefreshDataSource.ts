import {RefreshDataSource} from './datasources.types';
import * as E from 'fp-ts/Either';
import {RefreshDTO} from '../../domain/entities/RefreshDTO';
import {Client} from '../../../../core/types/client';
import {JWTTOKEN, REFRESHTOKEN, Storage} from '../storage/storage.types';
import {API_BASE_URL} from '../../../../../config';

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
  storage: Storage;
  constructor(client: Client, storage: Storage) {
    this.client = client;
    this.storage = storage;
  }
  refreshJwt = async (): Promise<E.Either<string, RefreshDTO>> => {
    const url = `${API_BASE_URL}/refresh`;
    const refreshToken: string = (await this.storage.get(REFRESHTOKEN)) ?? '';
    if (refreshToken === '') {
      return E.left('Refresh token not found');
    }
    const payload = {
      refreshToken,
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
      (data: ApiResponse) => {
        this.storage.set(
          JWTTOKEN,
          data.response.AuthenticationResult.AccessToken,
        );
        return E.right(true);
      },
    )(response);
  };
}
