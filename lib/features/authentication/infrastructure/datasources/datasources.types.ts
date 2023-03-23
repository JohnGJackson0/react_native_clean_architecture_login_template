import * as E from 'fp-ts/Either';
import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {LoginSanityDTO} from '../../domain/entities/LoginSanityDTO';
import {RefreshDTO} from '../../domain/entities/RefreshDTO';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import {UserAuthInfoDTO} from '../../domain/entities/UserAuthInfoDTO';

export interface ConfirmDataSource {
  getConfirm: (
    email: string,
    password: string,
    confirmCode: string,
  ) => Promise<E.Either<string, ConfirmDTO>>;
}

export interface LoginDataSource {
  login: (
    email: string,
    password: string,
  ) => Promise<E.Either<string, boolean>>;
}

export interface LoginSanityDataSource {
  getLoginSanity: () => Promise<E.Either<string, LoginSanityDTO>>;
}

export interface RefreshDataSource {
  refreshJwt: () => Promise<E.Either<string, RefreshDTO>>;
}

export interface UserSignUpDataSource {
  getSignUp: (
    email: string,
    password: string,
  ) => Promise<E.Either<string, UserSignUpDTO>>;
}

export interface UserAuthInfoDataSource {
  getAuthenticationInfo: () => Promise<E.Either<string, UserAuthInfoDTO>>;
}

export interface LogoutDataSource {
  logout: () => Promise<E.Either<string, boolean>>;
}

export interface ResetPasswordDataSource {
  resetPassword: (email: string) => Promise<E.Either<string, boolean>>;
}

export interface ConfirmChangePasswordDataSource {
  confirmPasswordReset: (
    email: string,
    verificationCode: string,
    newPassword: string,
  ) => Promise<E.Either<string, string>>;
}
