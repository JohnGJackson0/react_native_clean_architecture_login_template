import User from '../../domain/entities/UserSignUp';

export default class UserSignUpModel extends User {
  constructor(email: string, password: string) {
    super(email, password);
  }
}
