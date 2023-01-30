export default class UserSignUpModel {
  _email: string;
  _password: string;
  _authToken: string;
  _refreshToken: string;

  constructor(
    email: string,
    password: string,
    authToken: string,
    refreshToken: string,
  ) {
    this._email = email;
    this._password = password;
    this._authToken = authToken;
    this._refreshToken = refreshToken;
  }
}
