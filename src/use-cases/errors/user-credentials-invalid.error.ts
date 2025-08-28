export class UserCredentialsInvalid extends Error {
  constructor() {
    super('Credentials invalid, check email or password');
  }
}
