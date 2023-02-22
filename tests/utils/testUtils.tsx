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
