import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {LoginSanityDTO} from '../../domain/entities/LoginSanityDTO';
import {RefreshDTO} from '../../domain/entities/RefreshDTO';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import AuthenticationRepository from '../../domain/repositories/AuthenticationRepository';
import {
  ConfirmDataSource,
  LoginSanityDataSource,
  RefreshDataSource,
  UserSignUpDataSource,
} from '../datasources/datasources.types';
import * as E from 'fp-ts/Either';

export default class AuthenticationRepositoryImpl
  implements AuthenticationRepository
{
  signUpDatasource: UserSignUpDataSource;
  confirmDataSource: ConfirmDataSource;
  loginSanityDatasource: LoginSanityDataSource;
  refreshDataSource: RefreshDataSource;

  constructor(
    signUpDatasource: UserSignUpDataSource,
    confirmUserDataSource: ConfirmDataSource,
    loginSanityDataSource: LoginSanityDataSource,
    refreshDataSource: RefreshDataSource,
  ) {
    this.signUpDatasource = signUpDatasource;
    this.confirmDataSource = confirmUserDataSource;
    this.loginSanityDatasource = loginSanityDataSource;
    this.refreshDataSource = refreshDataSource;
  }

  public userSignUp = async (
    email: string,
    password: string,
  ): Promise<E.Either<string, UserSignUpDTO>> => {
    return await this.signUpDatasource.getSignUp(email, password);
  };

  public confirmUser = async (
    email: string,
    password: string,
    confirmCode: string,
  ): Promise<E.Either<string, ConfirmDTO>> => {
    return await this.confirmDataSource.getConfirm(
      email,
      password,
      confirmCode,
    );
  };

  public getLoginSanity = async (
    jwtToken: string,
  ): Promise<E.Either<string, LoginSanityDTO>> => {
    return await this.loginSanityDatasource.getLoginSanity(jwtToken);
  };

  public getRefresh = async (refresh: string) => {
    const datasource = await this.refreshDataSource.refreshJwt(refresh);

    return E.fold(
      error => {
        throw error;
      },
      value => value as RefreshDTO,
    )(datasource);
  };
}
