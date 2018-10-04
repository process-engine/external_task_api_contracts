/**
 * Describes the payload that must be send with a fetchAndLock HTTP POST request.
 */
export class FetchAndLockRequestPayload {

  private readonly _workerId: string;
  private readonly _topicName: string;
  private readonly _maxTasks: number;
  private readonly _longPollingTimeout: number;
  private readonly _lockDuration: number;

  constructor(workerId: string, topicName: string, maxTasks: number, longPollingTimeout: number, lockDuration: number) {
    this._workerId = workerId;
    this._topicName = topicName;
    this._maxTasks = maxTasks;
    this._longPollingTimeout = longPollingTimeout;
    this._lockDuration = lockDuration;
  }

  public get workerId(): string {
    return this._workerId;
  }

  public get topicName(): string {
    return this._topicName;
  }

  public get maxTasks(): number {
    return this._maxTasks;
  }

  public get longPollingTimeout(): number {
    return this._longPollingTimeout;
  }

  public get lockDuration(): number {
    return this._lockDuration;
  }
}
