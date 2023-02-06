import UserSignUp from '../../domain/entities/UserSignUp';
import AuthenticationRepository from '../../domain/repositories/AuthenticationRepository';
import UserSignUpDataSource from '../datasources/signUpDataSource';

export default class AuthenticationRepositoryImpl
  implements AuthenticationRepository
{
  datasource: UserSignUpDataSource;

  constructor(datasource: UserSignUpDataSource) {
    this.datasource = datasource;
  }

  public userSignUp = async (
    email: string,
    password: string,
  ): Promise<UserSignUp> => {
    return await this.datasource.getSignUp(email, password);
  };
}
