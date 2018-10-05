import * as moment from 'moment';

/**
 * Describes an ExternalTask that the ProcessEngine has delegated to an
 * ExternalTask worker for processing.
 */
export class ExternalTask {

  private readonly _id: string;
  private readonly _workerId: string;
  private readonly _topic: string;
  private readonly _flowNodeInstanceId: string;
  private readonly _correlationId: string;
  private readonly _processInstanceId: string;
  private readonly _lockExpirationTime?: Date;
  private readonly _payload: any;

  constructor(id: string,
              workerId: string,
              topic: string,
              flowNodeInstanceId: string,
              correlationId: string,
              processInstanceId: string,
              lockExpirationTime: Date,
              payload: any) {
  this._id = id;
  this._workerId = workerId;
  this._topic = topic;
  this._flowNodeInstanceId = flowNodeInstanceId;
  this._correlationId = correlationId;
  this._processInstanceId = processInstanceId;
  this._lockExpirationTime = lockExpirationTime;
  this._payload = payload;
  }

  /**
   * The external tasks ID.
   */
  public get id(): string {
    return this._id;
  }

  /**
   * The ID of the worker that has most recently locked the ExternalTask
   * for processing.
   */
  public get workerId(): string {
    return this._workerId;
  }

  /**
   * The topic to which the ExternalTask belongs.
   */
  public get topic(): string {
    return this._topic;
  }

  /**
   * The ID of the FlowNodeInstance that contains the definition
   * for the ExternalTask.
   */
  public get flowNodeInstanceId(): string {
    return this._flowNodeInstanceId;
  }

  /**
   * The ID of the Correlation that contains the FlowNodeInstance with the
   * ExternalTask's definition.
   */
  public get correlationId(): string {
    return this._correlationId;
  }

  /**
   * The ID of the ProcessInstance that contains the FlowNodeInstance with the
   * ExternalTask's definition.
   */
  public get processInstanceId(): string {
    return this._processInstanceId;
  }

  /**
   * The lock expiration time. On expiration, the task is released to
   * be processed by other workers.
   * If not set, the ExternalTask is not locked.
   */
  public get lockExpirationTime(): Date {
    return this._lockExpirationTime;
  }

  /**
   * The payload containing all relevant data the worker needs to execute the
   * ExternalTask.
   */
  public get payload(): any {
    return this._payload;
  }

  /**
   * Determines whether the ExternalTask is currently locked or not.
   * A finished ExternalTask is always locked.
   */
  public get isLocked(): boolean {
    if (!this.lockExpirationTime) {
      return false;
    }

    const lockExpirationAsMoment: moment.Moment = moment(this.lockExpirationTime);
    const now: moment.Moment = moment();

    return lockExpirationAsMoment.isAfter(now);
  }
}
