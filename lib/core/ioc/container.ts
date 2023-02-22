import DIContainer, {object, IDIContainer, use} from 'rsdi';
import UserSignUpDataSourceImpl from '../../features/authentication/infrastructure/datasources/SignUpDataSource';
import AuthenticationRepositoryImpl from '../../features/authentication/infrastructure/repositories/AuthenticationRepositoryImpl';
import SignUpUseCase from '../../features/authentication/domain/usecases/SignUpUseCase';
import ValidatorImpl from '../services/validator';
import ConfirmDataSourceImpl from '../../features/authentication/infrastructure/datasources/ConfirmDataSource';
import ConfirmUseCase from '../../features/authentication/domain/usecases/ConfirmUseCase';
import LoginSanityDataSourceImpl from '../../features/authentication/infrastructure/datasources/LoginSanityDataSource';

export default function configureDI(): IDIContainer {
  // TODO need types
  const container: any = new DIContainer();

  container.add({
    ENV: 'PRODUCTION',
    Validator: object(ValidatorImpl),
    ConfirmDataSource: object(ConfirmDataSourceImpl).construct(
      /**
       * TODO look into using Axios as I think it may be
       * better typescript / mock support
       */

      {
        fetch: fetch,
      },
    ),
    UserSignUpDataSource: object(UserSignUpDataSourceImpl).construct({
      fetch: fetch,
    }),
    LoginSanityDataSource: object(LoginSanityDataSourceImpl).construct({
      fetch: fetch,
    }),
    AuthRepo: object(AuthenticationRepositoryImpl).construct(
      use('UserSignUpDataSource'),
      use('ConfirmDataSource'),
      use('LoginSanityDataSource'),
    ),
    SignUpUseCase: object(SignUpUseCase).construct(
      use('AuthRepo'),
      use('Validator'),
    ),
    ConfirmUseCase: object(ConfirmUseCase).construct(
      use('AuthRepo'),
      use('Validator'),
    ),
  });

  return container;
}

export const AppIOCContainer = configureDI();
