import * as moment from 'moment';

import {ExternalTaskState} from './external_task_state';
import {IExternalTask} from './iexternal_task';

/**
 * Describes an ExternalTask that the ProcessEngine has delegated to an
 * ExternalTask worker for processing.
 */
export class ExternalTask implements IExternalTask {

  public id: string;
  /**
   * The ID of the worker that has most recently locked the ExternalTask
   * for processing.
   */
  public workerId: string;
  public topic: string;
  public flowNodeInstanceId: string;
  public correlationId: string;
  public processInstanceId: string;
  /**
   * The payload containing all relevant data the worker needs to execute the
   * ExternalTask.
   */
  public payload: any;
  /**
   * The lock expiration time. On expiration, the task is released to
   * be processed by other workers.
   * If not set, the ExternalTask is not locked.
   */
  public lockExpirationTime: Date;
  public state: ExternalTaskState = ExternalTaskState.pending;
  public finishedAt?: Date;
  public result?: any;
  public error?: any;
  public createdAt?: Date;

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
