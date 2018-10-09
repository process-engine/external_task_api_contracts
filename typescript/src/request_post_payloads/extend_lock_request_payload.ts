/**
 * Describes the payload that must be send with a extendLock HTTP POST request.
 */
export class ExtendLockRequestPayload {

  public readonly additionalDuration: number;

  constructor(additionalDuration: number) {
   this.additionalDuration = additionalDuration;
  }
}
