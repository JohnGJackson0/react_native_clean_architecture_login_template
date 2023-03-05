import * as E from 'fp-ts/Either';
import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {LoginSanityDTO} from '../../domain/entities/LoginSanityDTO';
import {RefreshDTO} from '../../domain/entities/RefreshDTO';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';

export interface ConfirmDataSource {
  getConfirm: (
    email: string,
    password: string,
    confirmCode: string,
  ) => Promise<E.Either<string, ConfirmDTO>>;
}

export interface LoginSanityDataSource {
  getLoginSanity: (jwtToken: string) => Promise<LoginSanityDTO>;
}

export interface RefreshDataSource {
  refreshJwt: (refreshToken: string) => Promise<E.Either<string, RefreshDTO>>;
}

export interface UserSignUpDataSource {
  getSignUp: (
    email: string,
    password: string,
  ) => Promise<E.Either<string, UserSignUpDTO>>;
}
