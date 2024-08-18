/*
  curl --location 'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/resendConfirmCode' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": "JohnGJAckson0@gmail.com"
  }'

  => {
    "message": "Confirmation code has been resent to JohnGJAckson0@gmail.com"
  }
*/

const AWS = require("aws-sdk");

exports.resendConfirmCode = async (event) => {
  try {
    const cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
    const { email } = JSON.parse(event.body);

    const params = {
      ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
      Username: email,
    };

    await cognitoIdentityServiceProvider
      .resendConfirmationCode(params)
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Confirmation code has been resent to ${email}`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
