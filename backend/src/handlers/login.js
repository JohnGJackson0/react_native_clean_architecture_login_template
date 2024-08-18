/*
  curl --location --request POST 'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{"email":"boxaka5531@ekcsoft.com", "password":"dsfdDFDF!3424"}'
*/

const AWS = require("aws-sdk");

exports.loginHandler = async (event) => {
  const cognitoIdentityServiceProvider =
    new AWS.CognitoIdentityServiceProvider();

  try {
    const { email, password } = JSON.parse(event.body);

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
        message: "User has been logged in successfully.",
        reponse: authResponse,
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
