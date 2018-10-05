import * as moment from 'moment';

import {IExternalTask} from './iexternal_task';

/**
 * Describes an ExternalTask that the ProcessEngine has delegated to an
 * ExternalTask worker for processing.
 */
export class ExternalTask implements IExternalTask {

  private readonly _id: string;
  private readonly _workerId: string;
  private readonly _topic: string;
  private readonly _flowNodeInstanceId: string;
  private readonly _correlationId: string;
  private readonly _processInstanceId: string;
  private readonly _payload: any;
  private readonly _lockExpirationTime: Date;
  private readonly _finished: boolean;
  private readonly _finishedAt: Date;
  private readonly _result: any;
  private readonly _error: any;
  private readonly _createdAt: Date;

  constructor(id: string,
              workerId: string,
              topic: string,
              flowNodeInstanceId: string,
              correlationId: string,
              processInstanceId: string,
              payload: any,
              lockExpirationTime: Date,
              finished: boolean,
              finishedAt?: Date,
              error?: Error,
              result?: any,
              createdAt?: Date) {
    this._id = id;
    this._workerId = workerId;
    this._topic = topic;
    this._flowNodeInstanceId = flowNodeInstanceId;
    this._correlationId = correlationId;
    this._processInstanceId = processInstanceId;
    this._payload = payload;
    this._lockExpirationTime = lockExpirationTime;
    this._finished = finished;
    this._finishedAt = finishedAt;
    this._result = result;
    this._error = error;
    this._createdAt = createdAt;
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
   * Determines if the ExternalTask as already been finished.
   */
  public get isFinished(): boolean {
    return this._finished;
  }

  /**
   * The date and time at which the ExternalTask was finished.
   * Only set, if 'isFinished' is 'true'.
   */
  public get finishedAt(): Date {
    return this._finishedAt;
  }

  /**
   * If the ExternalTask was finished successfully, this will contain the result.
   */
  public get result(): boolean {
    return this._result;
  }

  /**
   * If the ExternalTask was finished with an error, this will contain the error.
   */
  public get error(): any {
    return this._error;
  }

  /**
   * The date and time at which the ExternalTask was created.
   */
  public get createdAt(): Date {
    return this._createdAt;
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
