import AuthenticationRepositoryImpl from '../../lib/features/authentication/infrastructure/repositories/AuthenticationRepositoryImpl';

export const createScreenTestProps = (
  routeParam?: any,
  customProp?: Object,
) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
  },
  route: {params: routeParam},
  ...(customProp as any),
});

export const mockClient = (fetchedFixture: object) => ({
  fetch: jest.fn().mockResolvedValue({
    json: () => fetchedFixture,
  }),
});
export const mockRepo = () => {
  const mockSignUpDataSource = {getSignUp: jest.fn()};
  const mockConfirmDataSource = {getConfirm: jest.fn()};
  const mockLoginSanityDataSource = {getLoginSanity: jest.fn()};
  const mockRefreshDataSource = {refreshJwt: jest.fn()};

  return new AuthenticationRepositoryImpl(
    mockSignUpDataSource,
    mockConfirmDataSource,
    mockLoginSanityDataSource,
    mockRefreshDataSource,
  );
};
