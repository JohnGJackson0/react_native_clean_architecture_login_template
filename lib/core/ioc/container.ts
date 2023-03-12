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

export default function configureDI() {
  // TODO need types
  const container: any = new DIContainer();

  container.add({
    ENV: 'PRODUCTION',
    Validator: object(ValidatorImpl),
    Storage: ReactNativeAsyncStorageImpl,
    ConfirmDataSource: object(ConfirmDataSourceImpl).construct(
      {
        fetch: fetch,
      },
      use('Storage'),
    ),
    UserSignUpDataSource: object(UserSignUpDataSourceImpl).construct(client),
    LoginSanityDataSource: object(LoginSanityDataSourceImpl).construct(
      {
        fetch: fetch,
      },
      use('Storage'),
    ),
    RefreshDataSource: object(RefreshDataSourceImpl).construct({
      fetch: fetch,
    }),
    UserAuthInfoDataSource: object(UserAuthInfoDataSourceImpl).construct(
      use('Storage'),
    ),
    AuthRepo: object(AuthenticationRepositoryImpl).construct(
      use('UserSignUpDataSource'),
      use('ConfirmDataSource'),
      use('LoginSanityDataSource'),
      use('RefreshDataSource'),
      use('UserAuthInfoDataSource'),
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
    VerifyStoredAuthTokenUseCase: object(
      VerifyStoredAuthTokenUseCase,
    ).construct(use('AuthRepo')),
  });

  return container;
}

export const AppIOCContainer = configureDI();
