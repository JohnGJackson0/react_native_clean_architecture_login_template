export const createScreenTestProps = (customProp?: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  route: jest.fn(),
  ...(customProp as any),
});
