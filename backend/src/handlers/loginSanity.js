const AWS = require("aws-sdk");
/*
  curl --location --request POST 'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/loginSanity' \
  --header 'Authorization: <AccessToken>'

  => 

  {
    "message": "Authorization successful",
    "email": "Johngjackson0@gmail.com",
    "verifiedEmail": "true"
  }
*/

exports.loginSanity = async (event) => {
  try {
    const token = event.headers.Authorization;

    const params = {
      AccessToken: token,
    };
    const cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
    const userData = await cognitoIdentityServiceProvider
      .getUser(params)
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Authorization successful`,
        email: userData?.UserAttributes?.find((item) => item.Name === "email")
          .Value,
        verifiedEmail: userData?.UserAttributes?.find(
          (item) => item.Name === "email_verified"
        ).Value,
      }),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: `Authorization failed`,
      }),
    };
  }
};
