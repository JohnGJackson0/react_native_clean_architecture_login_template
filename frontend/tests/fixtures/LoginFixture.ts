export const LoginHappyCase = {
  message: 'User has been logged in successfully.',
  reponse: {
    ChallengeParameters: {},
    AuthenticationResult: {
      AccessToken: 'fakeAccessToken',
      ExpiresIn: 3600,
      TokenType: 'Bearer',
      RefreshToken: 'fakeRefreshToken',
      IdToken: 'fakeIdToken',
    },
  },
};
