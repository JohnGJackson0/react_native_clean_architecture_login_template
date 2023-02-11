import DIContainer, {object, IDIContainer, use} from 'rsdi';
import UserSignUpDataSourceImpl from '../../features/authentication/signup/data/datasources/signUpDataSource';
import AuthenticationRepositoryImpl from '../../features/authentication/signup/data/repositories/AuthenticationRepositoryImpl';
import SignUpUseCase from '../../features/authentication/signup/domain/usecases/SignUpUseCase';
import ValidatorImpl from '../validator';

export default function configureDI(): IDIContainer {
  const container: any = new DIContainer();

  container.add({
    ENV: 'PRODUCTION',
    Validator: object(ValidatorImpl),
    UserSignUpDataSource: object(UserSignUpDataSourceImpl).construct({
      fetch: fetch,
    }),
    AuthRepo: object(AuthenticationRepositoryImpl).construct(
      use('UserSignUpDataSource'),
    ),
    SignUpUseCase: object(SignUpUseCase).construct(
      use('AuthRepo'),
      use('Validator'),
    ),
  });

  return container;
}

export const AppIOCContainer = configureDI();
