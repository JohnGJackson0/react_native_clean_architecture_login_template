import 'reflect-metadata';
import {Container} from 'inversify';
import AuthenticationRepository from '../../features/authentication/signup/domain/repositories/AuthenticationRepository';
import AuthenticationRepositoryImpl from '../../features/authentication/signup/data/repositories/AuthenticationRepositoryImpl';
import ValidatorImpl, {Validator} from '../validator';
import ConfirmDataSourceImpl, {
  ConfirmDataSource,
} from '../../features/authentication/confirm/data/confirmDataSource';
import UserSignUpDataSourceImpl, {
  UserSignUpDataSource,
} from '../../features/authentication/signup/data/datasources/signUpDataSource';
import SignUpUseCase from '../../features/authentication/signup/domain/usecases/SignUpUseCase';
import {TYPES} from './Types';
import ConfirmUseCase from '../../features/authentication/confirm/domain/usecases/ConfirmUseCase';
import {Client} from '../client';

const container = new Container();

container.bind<Client>(TYPES.Client).toConstantValue({fetch});
container
  .bind<AuthenticationRepository>(TYPES.AuthenticationRepository)
  .to(AuthenticationRepositoryImpl)
  .inSingletonScope();
container.bind<Validator>(TYPES.Validator).to(ValidatorImpl).inSingletonScope();
container
  .bind<ConfirmDataSource>(TYPES.ConfirmDataSource)
  .to(ConfirmDataSourceImpl)
  .inSingletonScope();
container
  .bind<UserSignUpDataSource>(TYPES.UserSignUpDataSource)
  .to(UserSignUpDataSourceImpl)
  .inSingletonScope();
container
  .bind<SignUpUseCase>(TYPES.SignUpUseCase)
  .to(SignUpUseCase)
  .inSingletonScope();
container
  .bind<ConfirmUseCase>(TYPES.ConfirmUseCase)
  .to(ConfirmUseCase)
  .inSingletonScope();

export {container};
