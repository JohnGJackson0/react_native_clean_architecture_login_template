import {Client} from '../../../../core/types/client';
import {LoginSanityDTO} from '../../domain/entities/LoginSanityDTO';
import {JWTTOKEN, Storage} from '../storage/storage.types';
import {LoginSanityDataSource} from './datasources.types';
import * as E from 'fp-ts/Either';

export default class LoginSanityDataSourceImpl
  implements LoginSanityDataSource
{
  _client: Client;
  storage: Storage;

  constructor(client: Client, storage: Storage) {
    this._client = client;
    this.storage = storage;
  }

  getLoginSanity = async (): Promise<E.Either<string, LoginSanityDTO>> => {
    const JWT: string = (await this.storage.get(JWTTOKEN)) ?? '';

    if (JWT === '') {
      return E.left('Authorization failed');
    }

    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/loginSanity';

    return await this._client
      .fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: JWT},
      })
      .then(resp => {
        if (!resp.ok) {
          const errorResult = resp.json().then((data: any) => {
            return E.left(data?.message);
          });
          return errorResult;
        }
        return resp.json().then((data: any) => {
          if (
            data?.message === 'Authorization failed' ||
            data?.email === undefined
          ) {
            return E.left('Authorization failed');
          }
          const isEmailVerified = data?.verifiedEmail === 'true';

          return E.right({
            message: data?.message,
            email: data?.email,
            verifiedEmail: isEmailVerified,
          });
        });
      })
      .catch(_ => {
        return E.left(
          `Cannot fetch the specified resource most likely because of a network error.`,
        );
      });
  };
}
