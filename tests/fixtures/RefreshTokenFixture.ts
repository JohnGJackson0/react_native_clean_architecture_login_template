export const RefreshHappyFixture = {
  message: 'Token has been refreshed successfully.',
  response: {
    ChallengeParameters: {},
    AuthenticationResult: {
      AccessToken: 'FakeToken',
      ExpiresIn: 3600,
      TokenType: 'Bearer',
      IdToken: 'fakeJwt',
    },
  },
};
