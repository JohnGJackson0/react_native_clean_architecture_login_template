import {Client} from '../../../../core/client';
import {ConfirmDTO} from '../domain/ConfirmDTO';

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
      .then(resp => {
        if (!resp.ok) {
          return resp.text().then((text: string) => {
            throw new Error(JSON.parse(text).error);
          });
        } else {
          return {
            refreshToken: resp?.AuthenticationResult?.RefreshToken,
            jwtToken: resp?.AuthenticationResult?.AccessToken,
            email: email,
          };
        }
      });
  };
}
