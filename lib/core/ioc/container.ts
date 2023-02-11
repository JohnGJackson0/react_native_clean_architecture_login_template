import DIContainer, {object, IDIContainer, use} from 'rsdi';
import UserSignUpDataSourceImpl from '../../features/authentication/signup/data/datasources/signUpDataSource';
import AuthenticationRepositoryImpl from '../../features/authentication/signup/data/repositories/AuthenticationRepositoryImpl';
import SignUpUseCase from '../../features/authentication/signup/domain/usecases/SignUpUseCase';

export default function configureDI(): IDIContainer {
  const container: any = new DIContainer();

  container.add({
    ENV: 'PRODUCTION',
    UserSignUpDataSource: object(UserSignUpDataSourceImpl).construct({
      fetch: fetch,
    }),
    AuthRepo: object(AuthenticationRepositoryImpl).construct(
      use('UserSignUpDataSource'),
    ),
    SignUpUseCase: object(SignUpUseCase).construct(use('AuthRepo')),
  });

  return container;
}

export const AppIOCContainer = configureDI();
