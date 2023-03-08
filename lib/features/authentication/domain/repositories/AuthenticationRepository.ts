import {ConfirmDTO} from '../entities/ConfirmDTO';
import {LoginSanityDTO} from '../entities/LoginSanityDTO';
import {RefreshDTO} from '../entities/RefreshDTO';
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
  getLoginSanity: (
    jwtToken: string,
  ) => Promise<E.Either<string, LoginSanityDTO>>;
  getRefresh: (refresh: string) => Promise<RefreshDTO>;
}
