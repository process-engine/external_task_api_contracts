/**
 * Describes the payload that must be send with a handleServiceError HTTP POST request.
 */
export class HandleServiceErrorRequestPayload {

  public readonly errorDetails: string;
  public readonly errorMessage: string;

  constructor(errorMessage: string, errorDetails: string) {
   this.errorMessage = errorMessage;
   this.errorDetails = errorDetails;
  }
}
