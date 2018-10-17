import {IExternalTaskApi} from '.';
import {ExternalTask} from './data_models/external_task';

/**
 * This worker fetches ExternalTasks and handle them with given 
 * Callback. 
 */
export interface IExternalTaskWorker {

  /**
   * Wait for ExternalTasks on topic and handles them.
   *
   * @async
   * @param topic              The ExternalTasks topic.
   * @param handleAction       Action to handle ExternalTask
   */
  waitForAndHandle<TPayload>(
    topic: string,
    handleAction: (externalTask: ExternalTask<TPayload>) => Promise<void>): Promise<void>;
}
