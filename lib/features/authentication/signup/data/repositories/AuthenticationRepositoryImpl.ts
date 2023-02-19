import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ConfirmDataSource} from '../../../confirm/data/confirmDataSource';
import {ConfirmDTO} from '../../../confirm/domain/entities/ConfirmDTO';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import AuthenticationRepository from '../../domain/repositories/AuthenticationRepository';
import UserSignUpDataSource from '../datasources/signUpDataSource';
import {TYPES} from '../../../../../core/ioc/Types';

/**
 * This can pull from datasources, local, caching, ect.
 */

@injectable()
export default class AuthenticationRepositoryImpl
  implements AuthenticationRepository
{
  constructor(
    @inject(TYPES.UserSignUpDataSource)
    private signUpDatasource: UserSignUpDataSource,
    @inject(TYPES.ConfirmDataSource)
    private confirmDataSource: ConfirmDataSource,
  ) {}

  public userSignUp = async (
    email: string,
    password: string,
  ): Promise<UserSignUpDTO> => {
    return await this.signUpDatasource.getSignUp(email, password);
  };

  public confirmUser = async (
    email: string,
    password: string,
    confirmCode: string,
  ): Promise<ConfirmDTO> => {
    return await this.confirmDataSource.getConfirm(
      email,
      password,
      confirmCode,
    );
  };
}
