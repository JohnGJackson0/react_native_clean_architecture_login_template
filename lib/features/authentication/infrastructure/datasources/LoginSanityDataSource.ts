import {Client} from '../../../../core/types/client';
import {LoginSanityDTO} from '../../domain/entities/LoginSanityDTO';

export interface LoginSanityDataSource {
  getLoginSanity: (jwtToken: string) => Promise<LoginSanityDTO>;
}

export default class LoginSanityDataSourceImpl
  implements LoginSanityDataSource
{
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  getLoginSanity = async (jwtToken: string): Promise<LoginSanityDTO> => {
    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/loginSanity';

    return await this._client
      .fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: jwtToken},
      })
      .then(resp => resp.json())
      .then(data => {
        const isEmailVerified = data?.verifiedEmail === 'true';
        return {
          message: data?.message,
          email: data?.email,
          verifiedEmail: isEmailVerified,
        };
      });
  };
}
