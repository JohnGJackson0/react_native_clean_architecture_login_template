import UserSignUpModel from '../models/UserSignUpModel';

export interface UserSignUpDataSource {
  getSignUp: Promise<UserSignUpModel>;
}
