export class KeyNotFoundException extends Error {
  constructor(message = 'The supplied key has not been found') {
    super(message);
  }
}
