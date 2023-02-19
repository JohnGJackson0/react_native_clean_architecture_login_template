import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {Client} from '../../../../../core/client';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import {TYPES} from '../../../../../core/ioc/Types';

export interface UserSignUpDataSource {
  getSignUp: (email: string, password: string) => Promise<UserSignUpDTO>;
}

@injectable()
export default class UserSignUpDataSourceImpl implements UserSignUpDataSource {
  constructor(@inject(TYPES.Client) private client: Client) {}

  getSignUp = async (
    email: string,
    password: string,
  ): Promise<UserSignUpDTO> => {
    const data = {
      email: email,
      password: password,
    };

    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/signup';

    return await this.client
      .fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })
      .then(resp => {
        if (!resp.ok) {
          return resp.text().then((text: string) => {
            throw new Error(JSON.parse(text).error);
          });
        } else {
          return data;
        }
      });
  };
}
