import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
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
  ): Promise<UserSignUpDTO> => {
    const datasource = await this.signUpDatasource.getSignUp(email, password);

    return E.fold(
      error => {
        throw error;
      },
      value => value as UserSignUpDTO,
    )(datasource);
  };

  public confirmUser = async (
    email: string,
    password: string,
    confirmCode: string,
  ): Promise<ConfirmDTO> => {
    const dataSource = await this.confirmDataSource.getConfirm(
      email,
      password,
      confirmCode,
    );

    return E.fold(
      error => {
        throw error;
      },
      value => value as ConfirmDTO,
    )(dataSource);
  };

  public getLoginSanity = async (jwtToken: string) => {
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
