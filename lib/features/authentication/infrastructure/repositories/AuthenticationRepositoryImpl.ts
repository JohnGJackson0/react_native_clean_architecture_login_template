import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {LoginSanityDTO} from '../../domain/entities/LoginSanityDTO';
import {RefreshDTO} from '../../domain/entities/RefreshDTO';
import {UserAuthInfoDTO} from '../../domain/entities/UserAuthInfoDTO';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import AuthenticationRepository from '../../domain/repositories/AuthenticationRepository';
import {
  ConfirmDataSource,
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

  constructor(
    signUpDatasource: UserSignUpDataSource,
    confirmUserDataSource: ConfirmDataSource,
    loginSanityDataSource: LoginSanityDataSource,
    refreshDataSource: RefreshDataSource,
    authInfoDataSource: UserAuthInfoDataSource,
    logoutDataSource: LogoutDataSource,
  ) {
    this.signUpDatasource = signUpDatasource;
    this.confirmDataSource = confirmUserDataSource;
    this.loginSanityDatasource = loginSanityDataSource;
    this.refreshDataSource = refreshDataSource;
    this.authInfoDataSource = authInfoDataSource;
    this.logoutDataSource = logoutDataSource;
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

  public getRefresh = async (): Promise<E.Either<string, RefreshDTO>> => {
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
}
