export const ConfirmHappyFixture = {
  message: 'User has been signed up successfully.',
  response: {
    ChallengeParameters: {},
    AuthenticationResult: {
      AccessToken: 'fakeAccessToken',
      ExpiresIn: 3600,
      TokenType: 'Bearer',
      RefreshToken: 'fakeRefreshToken',
      IdToken: 'fakeId',
    },
  },
};

export const ConfirmSadFixture = {
  error: 'fakeError',
};
