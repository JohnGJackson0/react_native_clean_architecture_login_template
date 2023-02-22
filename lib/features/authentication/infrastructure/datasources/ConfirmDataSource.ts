import {Client} from '../../../../core/types/client';
import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';

export interface ConfirmDataSource {
  getConfirm: (
    email: string,
    password: string,
    confirmCode: string,
  ) => Promise<ConfirmDTO>;
}

export default class ConfirmDataSourceImpl implements ConfirmDataSource {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  getConfirm = async (
    email: string,
    password: string,
    confirmCode: string,
  ): Promise<ConfirmDTO> => {
    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/confirm';

    const payload = {email, password, confirmationCode: confirmCode};

    return await this._client
      .fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
      .then(resp => resp.json())
      .then(data => {
        return {
          refreshToken: data?.response?.AuthenticationResult?.RefreshToken,
          jwtToken: data?.response?.AuthenticationResult?.AccessToken,
          email: email,
        };
      });
  };
}
