import {Client} from '../../../../../core/client';
import UserSignUpModel from '../models/UserSignUpModel';

export interface UserSignUpDataSource {
  getSignUp: (email: string, password: string) => Promise<UserSignUpModel>;
}

export default class UserSignUpDataSourceImpl implements UserSignUpDataSource {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  getSignUp = async (email: string, password: string) => {
    const data = {
      email: email,
      password: password,
    };

    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/signup';

    const response: UserSignUpModel = await this._client.post(url, data);

    return response;
  };
}
