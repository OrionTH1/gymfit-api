export class CheckInAlreadyExistsError extends Error {
  constructor() {
    super('A Check In already exists in same date');
  }
}
