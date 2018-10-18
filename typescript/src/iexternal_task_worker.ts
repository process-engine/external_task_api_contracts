import {IIdentity} from '@essential-projects/iam_contracts';

import {ExternalTask} from './data_models/external_task';

/**
 * Definition of HandleExternalTask Callback. 
 */
export interface HandleExternalTaskAction<TPayload, TResult> {
  (externalTask: ExternalTask<TPayload>): Promise<TResult>
}

/**
 * This worker fetches ExternalTasks and handle them with given 
 * Callback. 
 */
export interface IExternalTaskWorker {

  /**
   * Wait for ExternalTasks on topic and handles them.
   *
   * @async
   * @param identity           IIdentity to fetch Tasks for.
   * @param topic              The ExternalTasks topic.
   * @param maxTasks           max. ExternalTasks to fetch.
   * @param longpollingTimeout Longpolling Timeout in ms.
   * @param handleAction       Action to handle ExternalTask.
   */
  waitForAndHandle<TPayload, TResult>(
    identity: IIdentity,
    topic: string,
    maxTasks: number,
    longpollingTimeout: number,
    handleAction: HandleExternalTaskAction<TPayload, TResult>): Promise<void>;
}
