/**
 * Describes the payload that must be send with a handleServiceError HTTP POST request.
 */
export class HandleServiceErrorRequestPayload {

  private readonly _errorDetails: string;
  private readonly _errorMessage: string;

  constructor(errorMessage: string, errorDetails: string) {
   this._errorMessage = errorMessage;
   this._errorDetails = errorDetails;
  }

  public get errorDetails(): string {
    return this._errorDetails;
  }

  public get errorMessage(): string {
    return this._errorMessage;
  }
}
