/**
 * Contains a message about a successfully finished ExternalTask.
 */
export class ExternalTaskSuccessMessage {
  private readonly _result: any;

  constructor(result: any) {
    this._result = result;
  }

  public get result(): any {
    return this._result;
  }
}
