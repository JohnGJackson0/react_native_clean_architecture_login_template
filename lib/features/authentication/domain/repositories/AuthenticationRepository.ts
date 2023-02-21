import {ConfirmDTO} from '../entities/ConfirmDTO';
import {UserSignUpDTO} from '../entities/UserSignUpDTO';

export default interface AuthenticationRepository {
  userSignUp: (email: string, password: string) => Promise<UserSignUpDTO>;
  confirmUser: (
    email: string,
    password: string,
    confirmCode: string,
  ) => Promise<ConfirmDTO>;
}
