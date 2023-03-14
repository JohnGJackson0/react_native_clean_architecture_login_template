import {Client} from '../../../../core/types/client';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import {UserSignUpDataSource} from './datasources.types';
import * as E from 'fp-ts/Either';

type JSONResponse = {
  ok?: boolean;
  data?: {
    message: string;
    response: {
      ChallengeParameters: Object;
      AuthenticationResult: {
        AccessToken: string;
        ExpiresIn: number;
        TokenType: 'Bearer';
        RefreshToken: string;
        IdToken: string;
      };
    };
  };
  errors?: string;
};

type JSONErrorResponse = {
  error: string;
};

export default class UserSignUpDataSourceImpl implements UserSignUpDataSource {
  _client;

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

    const response = await this._client.request<
      JSONResponse,
      JSONErrorResponse
    >(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });

    type errorResp = JSONErrorResponse | string;

    return E.fold(
      (error: errorResp) => {
        if (typeof error === 'string') {
          return E.left(error);
        }

        return E.left(error.error);
      },
      _value => E.right({email: email, password: password}),
    )(response);
  };
}
