/*

  After the user signs up, AWS will send an email to the user containing a confirmation code. This confirmation code must be used to confirm the account and receive the authentication token.

  curl --location --request POST 'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/confirm' \
  --header 'Content-Type: application/json' \
  --data-raw '{"email":"JohnGJAckson0@gmail.com", 
  "password": "password",
  "confirmationCode": "963587"
  }'
*/

const AWS = require("aws-sdk");

exports.confirmHandler = async (event) => {
  try {
    const cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
    const { email, password, confirmationCode } = JSON.parse(event.body);

    const confirmSignUpParams = {
      ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
      ConfirmationCode: confirmationCode,
      Username: email,
    };
    await cognitoIdentityServiceProvider
      .confirmSignUp(confirmSignUpParams)
      .promise();

    const authParams = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    const authResponse = await cognitoIdentityServiceProvider
      .initiateAuth(authParams)
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User has been signed up successfully.",
        response: authResponse,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
