/**
 * Describes the payload that must be send with a handleBpmnError HTTP POST request.
 */
export class HandleBpmnErrorRequestPayload {

  public readonly errorCode: string;

  constructor(errorCode: string) {
   this.errorCode = errorCode;
  }
}
