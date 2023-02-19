export const createScreenTestProps = (
  routeParam?: any,
  customProp?: Object,
) => ({
  navigation: {
    navigate: jest.fn(),
  },
  route: {params: routeParam},
  ...(customProp as any),
});
