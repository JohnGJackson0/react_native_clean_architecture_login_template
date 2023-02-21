export default class GeneralAPIError extends Error {
  constructor(msg?: string) {
    super(msg ?? '');
  }
}
