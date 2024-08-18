import {API_BASE_URL} from '../../../../../config';
import {Client} from '../../../../core/types/client';
import {LoginSanityDTO} from '../../domain/entities/LoginSanityDTO';
import {JWTTOKEN, Storage} from '../storage/storage.types';
import {LoginSanityDataSource} from './datasources.types';
import * as E from 'fp-ts/Either';

type JSONResponse = {
  message: string;
  email: string;
  verifiedEmail: string;
};

type JSONErrorResponse = {
  message: string;
};

export default class LoginSanityDataSourceImpl
  implements LoginSanityDataSource
{
  client: Client;
  storage: Storage;

  constructor(client: Client, storage: Storage) {
    this.client = client;
    this.storage = storage;
  }

  getLoginSanity = async (): Promise<E.Either<string, LoginSanityDTO>> => {
    const JWT: string = (await this.storage.get(JWTTOKEN)) ?? '';
    if (JWT === '') {
      return E.left('Authorization failed');
    }
    const url = `${API_BASE_URL}/loginSanity`;
    const response = await this.client.request<JSONResponse, JSONErrorResponse>(
      url,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: JWT},
      },
    );

    type errorResp = JSONErrorResponse | string;

    return E.fold(
      (error: errorResp) => {
        if (typeof error === 'string') {
          return E.left(error);
        }

        return E.left(error?.message);
      },
      (value: JSONResponse) => {
        return E.right({
          message: value?.message ?? '',
          email: value?.email ?? '',
          verifiedEmail: value?.verifiedEmail === 'true',
        });
      },
    )(response);
  };
}
