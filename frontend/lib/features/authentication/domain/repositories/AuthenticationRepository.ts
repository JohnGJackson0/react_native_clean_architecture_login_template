import {ConfirmDTO} from '../entities/ConfirmDTO';
import {LoginSanityDTO} from '../entities/LoginSanityDTO';
import {RefreshDTO} from '../entities/RefreshDTO';
import {UserAuthInfoDTO} from '../entities/UserAuthInfoDTO';
import {UserSignUpDTO} from '../entities/UserSignUpDTO';
import * as E from 'fp-ts/Either';

export default interface AuthenticationRepository {
  userSignUp: (
    email: string,
    password: string,
  ) => Promise<E.Either<string, UserSignUpDTO>>;
  confirmUser: (
    email: string,
    password: string,
    confirmCode: string,
  ) => Promise<E.Either<string, ConfirmDTO>>;
  getLoginSanity: () => Promise<E.Either<string, LoginSanityDTO>>;
  refreshSession: () => Promise<E.Either<string, RefreshDTO>>;
  getUserAuthInfo: () => Promise<E.Either<string, UserAuthInfoDTO>>;
  logout: () => Promise<E.Either<string, boolean>>;
  login: (
    email: string,
    password: string,
  ) => Promise<E.Either<string, boolean>>;
  resetPassword: (email: string) => Promise<E.Either<string, boolean>>;
  confirmPasswordReset: (
    email: string,
    verificationCode: string,
    newPassword: string,
  ) => Promise<E.Either<string, string>>;
}
