import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
import AuthenticationRepository from '../../domain/repositories/AuthenticationRepository';
import UserSignUpDataSource from '../datasources/signUpDataSource';

/**
 * This can pull from datasources, local, caching, ect.
 */

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
  ): Promise<UserSignUpDTO> => {
    return await this.datasource.getSignUp(email, password);
  };
}
