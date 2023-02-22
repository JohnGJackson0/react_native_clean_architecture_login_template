import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import AuthenticationRepository from '../../domain/repositories/AuthenticationRepository';
import {ConfirmDataSource} from '../datasources/ConfirmDataSource';
import {LoginSanityDataSource} from '../datasources/LoginSanityDataSource';
import UserSignUpDataSource from '../datasources/SignUpDataSource';

/**
 * This can pull from datasources, local, caching, ect.
 */

export default class AuthenticationRepositoryImpl
  implements AuthenticationRepository
{
  signUpDatasource: UserSignUpDataSource;
  confirmDataSource: ConfirmDataSource;
  loginSanityDatasource: LoginSanityDataSource;

  constructor(
    signUpDatasource: UserSignUpDataSource,
    confirmUserDataSource: ConfirmDataSource,
    loginSanityDataSource: LoginSanityDataSource,
  ) {
    this.signUpDatasource = signUpDatasource;
    this.confirmDataSource = confirmUserDataSource;
    this.loginSanityDatasource = loginSanityDataSource;
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

  public getLoginSanity = async (jwtToken: string) => {
    return await this.loginSanityDatasource.getLoginSanity(jwtToken);
  };
}
