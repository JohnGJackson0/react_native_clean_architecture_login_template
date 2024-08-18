/*
  On Sign up, Login, ect. where you recieve idToken, you will
  also recieve a refreshToken. We have to use the refresh token, 
  not the regular authentication token for this endpoint. 


  curl --location --request POST 'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/refresh' \
  --header 'Content-Type: application/json' \
  --data-raw '{"refreshToken":"[refresh token]"
  }'
*/

const AWS = require("aws-sdk");

exports.refreshHandler = async (event) => {
  const cognitoIdentityServiceProvider =
    new AWS.CognitoIdentityServiceProvider();

  try {
    const { refreshToken } = JSON.parse(event.body);
    console.log(refreshToken);

    const refreshParams = {
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    };
    const refreshResponse = await cognitoIdentityServiceProvider
      .initiateAuth(refreshParams)
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Token has been refreshed successfully.",
        response: refreshResponse,
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
