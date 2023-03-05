import {Client} from '../../../../core/types/client';
import {RefreshDataSource} from './datasources.types';
import * as E from 'fp-ts/Either';
import {RefreshDTO} from '../../domain/entities/RefreshDTO';

export default class RefreshDataSourceImpl implements RefreshDataSource {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  refreshJwt = async (
    refreshToken: string,
  ): Promise<E.Either<string, RefreshDTO>> => {
    const payload = {
      refreshToken,
    };

    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/refresh';

    return await this._client
      .fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
      .then(resp => {
        if (!resp.ok) {
          const errorResult = resp.json().then((data: any) => {
            return E.left(data?.error);
          });
          return errorResult;
        }

        return resp.json().then((data: any) => {
          return E.right({
            jwt: data?.response?.AuthenticationResult?.AccessToken,
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
