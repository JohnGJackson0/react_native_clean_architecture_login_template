export const ConfirmHappyFixture = {
  message: 'User has been signed up successfully.',
  ChallengeParameters: {},
  AuthenticationResult: {
    AccessToken: 'fakeAccessToken',
    ExpiresIn: 3600,
    TokenType: 'Bearer',
    RefreshToken: 'fakeRefreshToken',
    IdToken: 'fakeId',
  },
  ok: true,
};

export const ConfirmSadFixture = {
  error: 'fakeError',
  ok: false,
};
