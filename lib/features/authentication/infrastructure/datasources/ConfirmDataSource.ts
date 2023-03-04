import * as E from 'fp-ts/Either';
import {Client} from '../../../../core/types/client';
import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {ConfirmDataSource} from './datasources.types';

export default class ConfirmDataSourceImpl implements ConfirmDataSource {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
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
            return E.left(data?.message);
          });
          return errorResult;
        }

        const resp = response.json().then((data: any) => {
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
