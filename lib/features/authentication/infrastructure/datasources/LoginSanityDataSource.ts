import {ClientReq} from '../../../../core/services/request';
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
  client: ClientReq;
  storage: Storage;

  constructor(client: ClientReq, storage: Storage) {
    this.client = client;
    this.storage = storage;
  }

  getLoginSanity = async (): Promise<E.Either<string, LoginSanityDTO>> => {
    const JWT: string = (await this.storage.get(JWTTOKEN)) ?? '';

    if (JWT === '') {
      return E.left('Authorization failed');
    }

    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/loginSanity';

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
