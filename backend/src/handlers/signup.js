/*
    curl --location --request POST 'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{"email":"boxaka5531@ekcsoft.com", "password":"dsfdDFDF!3424"}'
*/

const AWS = require("aws-sdk");

exports.signupHandler = async (event) => {
  const cognitoIdentityServiceProvider =
    new AWS.CognitoIdentityServiceProvider();

  console.log(event);

  try {
    const { email, password } = JSON.parse(event.body);

    const params = {
      ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
      Password: password,
      Username: email,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    };

    const response = await cognitoIdentityServiceProvider
      .signUp(params)
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User has been signed up successfully.",
        response: response,
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
