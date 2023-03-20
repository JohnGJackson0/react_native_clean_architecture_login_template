import DIContainer, {object, use} from 'rsdi';
import UserSignUpDataSourceImpl from '../../features/authentication/infrastructure/datasources/SignUpDataSource';
import AuthenticationRepositoryImpl from '../../features/authentication/infrastructure/repositories/AuthenticationRepositoryImpl';
import SignUpUseCase from '../../features/authentication/domain/usecases/SignUpUseCase';
import ValidatorImpl from '../services/validator';
import ConfirmDataSourceImpl from '../../features/authentication/infrastructure/datasources/ConfirmDataSource';
import ConfirmUseCase from '../../features/authentication/domain/usecases/ConfirmUseCase';
import LoginSanityDataSourceImpl from '../../features/authentication/infrastructure/datasources/LoginSanityDataSource';
import LoginSanityUseCase from '../../features/authentication/domain/usecases/LoginSanityUseCase';
import RefreshDataSourceImpl from '../../features/authentication/infrastructure/datasources/RefreshDataSource';
import {client} from '../services/request';
import ReactNativeAsyncStorageImpl from '../../features/authentication/infrastructure/storage/reactNativeAsyncStorageImpl';
import VerifyStoredAuthTokenUseCase from '../../features/authentication/domain/usecases/VerifyStoredAuthTokenUseCase';
import UserAuthInfoDataSourceImpl from '../../features/authentication/infrastructure/datasources/UserAuthInfoDataSource';
import LogoutDataSourceImpl from '../../features/authentication/infrastructure/datasources/LogoutDataSource';
import LogoutUseCase from '../../features/authentication/domain/usecases/LogoutUseCase';
import LoginDataSourceImpl from '../../features/authentication/infrastructure/datasources/LoginDataSource';
import LoginUseCase from '../../features/authentication/domain/usecases/LoginUseCase';

export default function configureDI() {
  // TODO need types
  const container: any = new DIContainer();

  container.add({
    ENV: 'PRODUCTION',
    Validator: object(ValidatorImpl),
    Storage: ReactNativeAsyncStorageImpl,
    logoutDataSource: object(LogoutDataSourceImpl).construct(use('Storage')),
    ConfirmDataSource: object(ConfirmDataSourceImpl).construct(
      client,
      use('Storage'),
    ),
    UserSignUpDataSource: object(UserSignUpDataSourceImpl).construct(client),
    LoginSanityDataSource: object(LoginSanityDataSourceImpl).construct(
      client,
      use('Storage'),
    ),
    RefreshDataSource: object(RefreshDataSourceImpl).construct(
      client,
      use('Storage'),
    ),
    UserAuthInfoDataSource: object(UserAuthInfoDataSourceImpl).construct(
      use('Storage'),
    ),
    LoginDataSource: object(LoginDataSourceImpl).construct(
      client,
      use('Storage'),
    ),
    AuthRepo: object(AuthenticationRepositoryImpl).construct(
      use('UserSignUpDataSource'),
      use('ConfirmDataSource'),
      use('LoginSanityDataSource'),
      use('RefreshDataSource'),
      use('UserAuthInfoDataSource'),
      use('logoutDataSource'),
      use('LoginDataSource'),
    ),

    SignUpUseCase: object(SignUpUseCase).construct(
      use('AuthRepo'),
      use('Validator'),
    ),
    ConfirmUseCase: object(ConfirmUseCase).construct(
      use('AuthRepo'),
      use('Validator'),
    ),
    // tests the authorizer / jwt refresh
    LoginSanityUseCase: object(LoginSanityUseCase).construct(use('AuthRepo')),
    LogoutUseCase: object(LogoutUseCase).construct(use('AuthRepo')),
    LoginUseCase: object(LoginUseCase).construct(
      use('AuthRepo'),
      use('Validator'),
    ),
    VerifyStoredAuthTokenUseCase: object(
      VerifyStoredAuthTokenUseCase,
    ).construct(use('AuthRepo')),
  });

  return container;
}

export const AppIOCContainer = configureDI();
