export const SignUpHappyFixture = {
  message: 'User has been signed up successfully.',
  response: {
    CodeDeliveryDetails: {
      AttributeName: 'email',
      DeliveryMedium: 'EMAIL',
      Destination: 'J***@g***',
    },
    UserConfirmed: false,
    UserSub: '7bcf6870-99f0-4356-8c02-15e5fc71735c',
  },
};

export const SignUpSadFixture = {
  error: 'errorMessage',
};
