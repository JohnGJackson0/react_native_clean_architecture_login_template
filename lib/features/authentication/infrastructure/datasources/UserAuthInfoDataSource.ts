import {UserAuthInfoDTO} from '../../domain/entities/UserAuthInfoDTO';
import {EMAIL, JWTTOKEN, REFRESHTOKEN, Storage} from '../storage/storage.types';
import * as E from 'fp-ts/Either';
import {UserAuthInfoDataSource} from './datasources.types';

export default class UserAuthInfoDataSourceImpl
  implements UserAuthInfoDataSource
{
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  getAuthenticationInfo = async (): Promise<
    E.Either<string, UserAuthInfoDTO>
  > => {
    try {
      return E.right({
        email: (await this.storage.get(EMAIL)) ?? '',
        jwt: (await this.storage.get(JWTTOKEN)) ?? '',
        refreshToken: (await this.storage.get(REFRESHTOKEN)) ?? '',
      });
    } catch (e: unknown) {
      return E.left(e?.toString() ?? 'unknown storage error');
    }
  };
}
