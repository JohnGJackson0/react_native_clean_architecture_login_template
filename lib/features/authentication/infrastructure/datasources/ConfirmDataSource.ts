import * as E from 'fp-ts/Either';
import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {ConfirmDataSource} from './datasources.types';
import {EMAIL, JWTTOKEN, REFRESHTOKEN, Storage} from '../storage/storage.types';
import {ClientReq} from '../../../../core/services/request';

interface ApiResponse {
  message: string;
  response: {
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

export default class ConfirmDataSourceImpl implements ConfirmDataSource {
  client: ClientReq;
  storage: Storage;

  constructor(client: ClientReq, storage: Storage) {
    this.client = client;
    this.storage = storage;
  }

  getConfirm = async (
    email: string,
    password: string,
    confirmCode: string,
  ): Promise<E.Either<string, ConfirmDTO>> => {
    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/confirm';

    const payload = {email, password, confirmationCode: confirmCode};

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
          data?.response?.AuthenticationResult?.AccessToken,
        );
        this.storage.set(
          REFRESHTOKEN,
          data?.response?.AuthenticationResult?.RefreshToken,
        );
        this.storage.set(EMAIL, email);

        return E.right(true);
      },
    )(response);
  };
}
