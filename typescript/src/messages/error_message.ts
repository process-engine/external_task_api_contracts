/**
 * Contains a message about a failed ExternalTask.
 */
export class ExternalTaskErrorMessage {
  private readonly _error: Error;

  constructor(error: Error) {
    this._error = error;
  }

  public get error(): Error {
    return this._error;
  }
}
