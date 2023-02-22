import {ConfirmDTO} from '../entities/ConfirmDTO';
import {LoginSanityDTO} from '../entities/LoginSanityDTO';
import {UserSignUpDTO} from '../entities/UserSignUpDTO';

export default interface AuthenticationRepository {
  userSignUp: (email: string, password: string) => Promise<UserSignUpDTO>;
  confirmUser: (
    email: string,
    password: string,
    confirmCode: string,
  ) => Promise<ConfirmDTO>;
  getLoginSanity: (jwtToken: string) => Promise<LoginSanityDTO>;
}
