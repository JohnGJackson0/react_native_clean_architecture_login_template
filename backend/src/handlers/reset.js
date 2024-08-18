const AWS = require("aws-sdk");
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

/*
  curl --location --request POST 'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/reset' \
  --header 'Content-Type: application/json' \
  --data-raw '{"email":"johngjackson0@gmail.com"}'

  Recieved:

  6 digit code will be sent to email

  {
    "message": "Password reset successful"
  }
*/

exports.resetHandler = async (event) => {
  const body = JSON.parse(event.body);
  const { email } = body;

  const params = {
    ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
    Username: email,
  };

  try {
    await cognitoIdentityServiceProvider.forgotPassword(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Password reset sent to email" }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Password reset failed",
        error: err.message,
      }),
    };
  }
};
