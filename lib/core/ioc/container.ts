import DIContainer, {object} from 'rsdi';
import UserSignUpDataSourceImpl from '../../features/authentication/signup/data/datasources/signUpDataSource';

export default function configureDI() {
  const container = new DIContainer();

  container.add({
    ENV: 'PRODUCTION',
    // TODO
    FETCH: fetch,
    UserSignUpDataSource: object(UserSignUpDataSourceImpl).construct({
      fetch: fetch,
    }),
  });

  return container;
}
