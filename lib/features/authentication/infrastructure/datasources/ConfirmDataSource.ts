import * as E from 'fp-ts/Either';
import {Client} from '../../../../core/types/client';
import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {ConfirmDataSource} from './datasources.types';
import {EMAIL, JWTTOKEN, REFRESHTOKEN, Storage} from '../storage/storage.types';

export default class ConfirmDataSourceImpl implements ConfirmDataSource {
  _client: Client;
  storage: Storage;

  constructor(client: Client, storage: Storage) {
    this._client = client;
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

    return await this._client
      .fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
      .then(response => {
        if (!response.ok) {
          const errorResult = response.json().then((data: any) => {
            return E.left(data?.error);
          });
          return errorResult;
        }

        const resp = response.json().then((data: any) => {
          this.storage.set(
            JWTTOKEN,
            data?.response?.AuthenticationResult?.AccessToken,
          );
          this.storage.set(
            REFRESHTOKEN,
            data?.response?.AuthenticationResult?.RefreshToken,
          );
          this.storage.set(EMAIL, email);

          return E.right({
            refreshToken: data?.response?.AuthenticationResult?.RefreshToken,
            jwtToken: data?.response?.AuthenticationResult?.AccessToken,
            email: email,
          });
        });

        return resp;
      })
      .catch(_ => {
        return E.left(
          `Cannot fetch the specified resource most likely because of a network error.`,
        );
      });
  };
}
