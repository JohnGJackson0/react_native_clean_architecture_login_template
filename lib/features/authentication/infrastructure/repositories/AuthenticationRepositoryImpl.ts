import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {LoginSanityDTO} from '../../domain/entities/LoginSanityDTO';
import {RefreshDTO} from '../../domain/entities/RefreshDTO';
import {UserAuthInfoDTO} from '../../domain/entities/UserAuthInfoDTO';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import AuthenticationRepository from '../../domain/repositories/AuthenticationRepository';
import {
  ConfirmDataSource,
  LoginDataSource,
  LoginSanityDataSource,
  LogoutDataSource,
  RefreshDataSource,
  UserAuthInfoDataSource,
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
  authInfoDataSource: UserAuthInfoDataSource;
  logoutDataSource: LogoutDataSource;
  loginDataSource: LoginDataSource;

  constructor(
    signUpDatasource: UserSignUpDataSource,
    confirmUserDataSource: ConfirmDataSource,
    loginSanityDataSource: LoginSanityDataSource,
    refreshDataSource: RefreshDataSource,
    authInfoDataSource: UserAuthInfoDataSource,
    logoutDataSource: LogoutDataSource,
    loginDataSource: LoginDataSource,
  ) {
    this.signUpDatasource = signUpDatasource;
    this.confirmDataSource = confirmUserDataSource;
    this.loginSanityDatasource = loginSanityDataSource;
    this.refreshDataSource = refreshDataSource;
    this.authInfoDataSource = authInfoDataSource;
    this.logoutDataSource = logoutDataSource;
    this.loginDataSource = loginDataSource;
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

  public getLoginSanity = async (): Promise<
    E.Either<string, LoginSanityDTO>
  > => {
    return await this.loginSanityDatasource.getLoginSanity();
  };

  public refreshSession = async (): Promise<E.Either<string, RefreshDTO>> => {
    return await this.refreshDataSource.refreshJwt();
  };

  public getUserAuthInfo = async (): Promise<
    E.Either<string, UserAuthInfoDTO>
  > => {
    return await this.authInfoDataSource.getAuthenticationInfo();
  };

  public logout = async (): Promise<E.Either<string, boolean>> => {
    return await this.logoutDataSource.logout();
  };

  public login = async (
    email: string,
    password: string,
  ): Promise<E.Either<string, boolean>> => {
    return await this.loginDataSource.login(email, password);
  };
}
