/**
 * Describes the payload that must be send with a handleBpmnError HTTP POST request.
 */
export class HandleBpmnErrorRequestPayload {

  private readonly _errorCode: string;

  constructor(errorCode: string) {
   this._errorCode = errorCode;
  }

  public get errorCode(): string {
    return this._errorCode;
  }
}
