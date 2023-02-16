import {ConfirmDataSource} from '../../../confirm/data/confirmDataSource';
import {ConfirmDTO} from '../../../confirm/domain/ConfirmDTO';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import AuthenticationRepository from '../../domain/repositories/AuthenticationRepository';
import UserSignUpDataSource from '../datasources/signUpDataSource';

/**
 * This can pull from datasources, local, caching, ect.
 */

export default class AuthenticationRepositoryImpl
  implements AuthenticationRepository
{
  signUpDatasource: UserSignUpDataSource;
  confirmDataSource: ConfirmDataSource;

  constructor(
    signUpDatasource: UserSignUpDataSource,
    confirmUserDataSource: ConfirmDataSource,
  ) {
    this.signUpDatasource = signUpDatasource;
    this.confirmDataSource = confirmUserDataSource;
  }

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
