/**
 * Describes the payload that must be send with a finishExternalTask HTTP POST request.
 */
export class FinishExternalTaskRequestPayload {

  private readonly _result: any;

  constructor(result: any) {
   this._result = result;
  }

  public get result(): any {
    return this._result;
  }
}
