import {Client} from '../../../../core/types/client';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import {UserSignUpDataSource} from './datasources.types';
import * as E from 'fp-ts/Either';

export default class UserSignUpDataSourceImpl implements UserSignUpDataSource {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  getSignUp = async (
    email: string,
    password: string,
  ): Promise<E.Either<string, UserSignUpDTO>> => {
    const payload = {
      email: email,
      password: password,
    };

    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/signup';

    return await this._client
      .fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
      .then(resp => {
        if (!resp.ok) {
          return resp.json().then((data: any) => {
            return E.left(data?.error);
          });
        } else {
          return resp.json().then((data: any) => {
            return E.right(data);
          });
        }
      })
      .catch(_ => {
        return E.left(
          'Cannot fetch the specified resource most likely because of a network error.',
        );
      });
  };
}
