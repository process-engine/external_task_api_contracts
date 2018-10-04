/**
 * Describes the payload that must be send with a extendLock HTTP POST request.
 */
export class ExtendLockRequestPayload {

  private readonly _additionalDuration: number;

  constructor(additionalDuration: number) {
   this._additionalDuration = additionalDuration;
  }

  public get additionalDuration(): number {
    return this._additionalDuration;
  }
}
