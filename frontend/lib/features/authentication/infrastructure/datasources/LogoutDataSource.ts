import {EMAIL, JWTTOKEN, REFRESHTOKEN, Storage} from '../storage/storage.types';
import * as E from 'fp-ts/Either';
import {LogoutDataSource} from './datasources.types';

export default class LogoutDataSourceImpl implements LogoutDataSource {
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  logout = async (): Promise<E.Either<string, boolean>> => {
    try {
      this.storage.remove(JWTTOKEN);
      this.storage.remove(EMAIL);
      this.storage.remove(REFRESHTOKEN);
      return E.right(true);
    } catch (_e) {
      return E.left('Logout failed');
    }
  };
}
