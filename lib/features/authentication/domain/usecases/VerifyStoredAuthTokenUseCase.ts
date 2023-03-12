import * as E from 'fp-ts/Either';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import {UserAuthInfoDTO} from '../entities/UserAuthInfoDTO';

export default class VerifyStoredAuthTokenUseCase {
  repository: AuthenticationRepository;

  constructor(repo: AuthenticationRepository) {
    this.repository = repo;
  }

  isValid = (value: string) => {
    return value !== '' && value !== null;
  };

  public execute = async (): Promise<E.Either<string, boolean>> => {
    const authInfo = await this.repository.getUserAuthInfo();

    return E.fold(
      error => {
        return E.left(error?.toString() ?? 'unknown storage error');
      },
      (value: UserAuthInfoDTO) => {
        if (
          !this.isValid(value?.email) ||
          !this.isValid(value?.jwt) ||
          !this.isValid(value?.refreshToken)
        ) {
          return E.right(false);
        }
        return E.right(true);
      },
    )(authInfo);
  };
}
