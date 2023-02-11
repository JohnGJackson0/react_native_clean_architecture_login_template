import {UserSignUpDTO} from '../entities/UserSignUpDTO';

/*
  There is no enforcement for names of functions and parameter
  types in typescript
*/

export default interface AuthenticationRepository {
  userSignUp: (email: string, password: string) => Promise<UserSignUpDTO>;
}
