import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ConfirmDTO} from '../domain/entities/ConfirmDTO';
import {TYPES} from '../../../../core/ioc/Types';
import {Client} from '../../../../core/client';

export interface ConfirmDataSource {
  getConfirm: (
    email: string,
    password: string,
    confirmCode: string,
  ) => Promise<ConfirmDTO>;
}
@injectable()
export default class ConfirmDataSourceImpl implements ConfirmDataSource {
  constructor(@inject(TYPES.Client) private client: Client) {}

  getConfirm = async (
    email: string,
    password: string,
    confirmCode: string,
  ): Promise<ConfirmDTO> => {
    const url =
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/confirm';

    return await this.client
      .fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          password,
          confirmCode,
        }),
      })
      // TODO: Inferred by usage
      .then(resp => {
        const response = resp?.response;
        if (!resp.ok) {
          return resp.text().then((text: string) => {
            throw new Error(JSON.parse(text).error);
          });
        } else {
          return {
            refreshToken: response.AuthenticationResult?.RefreshToken,
            jwtToken: response.AuthenticationResult?.AccessToken,
            email: email,
          };
        }
      });
  };
}
