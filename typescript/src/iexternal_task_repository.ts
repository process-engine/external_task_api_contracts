import {ExternalTask} from './data_models/external_task';

/**
 * The repository used to store and retrieve ExternalTasks.
 */
export interface IExternalTaskRepository {

  /**
   * Persists the given ExternalTask in the database.
   *
   * @async
   * @param externalTask The external task to persist.
   */
  create(externalTask: ExternalTask): Promise<void>;

  /**
   *
   * Fetches the tasks available for a particular worker and locks
   * them for the given amount of time.
   *
   * @async
   * @param workerId  The ID of the worker on whose behalf tasks are fetched.
   *                  The returned tasks are locked for that worker and
   *                  can only be completed when providing the same workerId.
   * @param topicName The name of the topic. This topic is used to get the
   *                  tasks for an external worker from the BPMN.
   * @param maxTasks  The maximum number of tasks to return.
   * @param lockDate  The date and time until the fetched tasks will be locked
   *                  and inaccessible to other workers.
   * @returns         An Array of fetched and locked ExternalTasks.
   */
  fetchAndLockExternalTasks(workerId: string,
                            topicName: string,
                            maxTasks: number,
                            lockDate: Date): Promise<Array<ExternalTask>>;

  /**
   *
   * Extends the timeout of a lock by a given amount of time.
   *
   * @async
   * @param workerId           The ID of a worker who is locking the ExternalTask.
   * @param externalTaskId     The ID of the ExternalTask.
   * @param additionalDuration The additional amount of time by which to extend
   *                           the lock, based on the current datetime.
   */
  extendLock(workerId: string, externalTaskId: string, additionalDuration: number): Promise<void>;

  /**
   *
   * Completes an ExternalTask by ID and updates any related process variables.
   *
   * @async
   * @param workerId       The ID of the worker that completes the task.
   *                       Must match the ID of the worker who has most recently
   *                       locked the task.
   * @param externalTaskId The ID of the ExternalTask to finish.
   * @param payload        The payload containing the process variables to update.
   */
  finishExternalTask(workerId: string, externalTaskId: string, payload: any): Promise<void>;
}
