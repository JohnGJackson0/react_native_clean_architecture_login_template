export const SignUpHappyFixture = {
  email: 'fakeEmail@fakeEmail.com',
  password: 'fakePassword',
  ok: true,
};

export const SignUpSadFixture = {
  email: 'fakeEmail@fakeEmail.com',
  password: 'fakePassword',
  ok: false,
  text: jest.fn(() => Promise.resolve('{"message":{"error":"testMessage"}}')),
  error: {
    message: 'test',
  },
};
