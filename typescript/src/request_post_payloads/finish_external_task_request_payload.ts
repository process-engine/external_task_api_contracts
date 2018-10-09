/**
 * Describes the payload that must be send with a finishExternalTask HTTP POST request.
 */
export class FinishExternalTaskRequestPayload {

  public readonly result: any;

  constructor(result: any) {
   this.result = result;
  }
}
