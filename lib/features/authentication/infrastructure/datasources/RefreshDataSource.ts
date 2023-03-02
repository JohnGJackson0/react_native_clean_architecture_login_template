import {Client} from '../../../../core/types/client';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';

export interface RefreshDataSource {
  refreshJwt: (refreshToken: string) => Promise<UserSignUpDTO>;
}

export default class RefreshDataSourceImpl implements RefreshDataSource {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  refreshJwt = async (refreshToken: string): Promise<any> => {
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
      .then(resp => resp.json())
      .then(data => {
        return {
          jwt: data?.response?.AuthenticationResult?.AccessToken,
        };
      });
  };
}
