import * as E from 'fp-ts/Either';
import {LoginDataSource} from './datasources.types';
import {EMAIL, JWTTOKEN, REFRESHTOKEN, Storage} from '../storage/storage.types';
import {Client} from '../../../../core/types/client';

interface ApiResponse {
  message: string;
  // TODO: Fix typo in API
  reponse: {
    ChallengeParameters: {};
    AuthenticationResult: {
      AccessToken: string;
      ExpiresIn: number;
      TokenType: string;
      RefreshToken: string;
      IdToken: string;
    };
  };
}

interface ApiError {
  error: string;
}

export default class LoginDataSourceImpl implements LoginDataSource {
  client: Client;
  storage: Storage;

  constructor(client: Client, storage: Storage) {
    this.client = client;
    this.storage = storage;
  }

  login = async (
    email: string,
    password: string,
  ): Promise<E.Either<string, boolean>> => {
    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/login';

    const payload = {email, password};

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
        console.log(data);
        this.storage.set(
          JWTTOKEN,
          data?.reponse?.AuthenticationResult?.AccessToken,
        );
        this.storage.set(
          REFRESHTOKEN,
          data?.reponse?.AuthenticationResult?.RefreshToken,
        );
        this.storage.set(EMAIL, email);

        return E.right(true);
      },
    )(response);
  };
}
