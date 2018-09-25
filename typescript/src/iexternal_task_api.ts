import { ExternalTask } from './data_models/external_task';

/**
 * Service for process engine external task execution. External tasks are tasks in a process flow that are executed by an external service.
 * In order to execute them the service has to poll the tasks/jobs and report the result back to the process engine (process variables or errors).
 */
export interface IExternalTaskApi {

  /**
   *
   * Fetches the tasks available for a particular (external) service and locks them for a defined time.
   *
   * @param identity           The requesting users identity. Should usually be an auth token.
   * @param workerId           The ID of the worker on which behalf tasks are fetched.
   *                           The returned tasks are locked for that worker and can only be completed when providing the same worker id.
   * @param topicName          The name of the topic. This topic is used to get the tasks for an external worker from the BPMN.
   * @param maxTasks           The maximum number of tasks to return.
   * @param longPollingTimeout The Long Polling timeout in milliseconds.
   * @param lockDuration       The duration of the lock. The task will be locked for the calling worker by this duration and cannot be 
   *                           fetched by other workers until the lock has expired.
   */
  fetchAndLockExternalTasks<TPayload>(identity: string,
                                      workerId: string,
                                      topicName: string,
                                      maxTasks: number,
                                      longPollingTimeout: number,
                                      lockDuration: number): Promise<Array<ExternalTask<TPayload>>>;

  /**
   *
   * Extends the timeout of a lock by a given amount of time.
   *
   * @param identity           The requesting users identity. Should usually be an auth token.
   * @param workerId           The ID of a worker who is locking the external task.
   * @param externalTaskId     The ID of the external task.
   * @param additionalDuration An amount of time (in milliseconds). This is the new lock duration starting from the current moment.
   */
  extendLock(identity: string, workerId: string, externalTaskId: string, additionalDuration: number): Promise<void>;

  /**
   *
   * Reports a business error in the context of a running external task by ID. The error code must be specified to identify the BPMN error handler.
   *
   * @param identity           The requesting users identity. Should usually be an auth token.
   * @param workerId       The ID of the worker that reports the failure. Must match the ID of the worker who has most recently locked the task.
   * @param externalTaskId The ID of the external task in which context a BPMN error is reported.
   * @param errorCode      n error code that indicates the predefined error. Is used to identify the BPMN error handler.
   */
  handleBpmnError(identity: string, workerId: string, externalTaskId: string, errorCode: string): Promise<void>;

  /**
   *
   * Reports a failure to execute an external task by ID. A number of retries and a timeout until the task can be retried can be specified.
   * If retries are set to 0, an incident for this task is created.
   *
   * @param identity           The requesting users identity. Should usually be an auth token.
   * @param workerId       The ID of the worker that reports the failure. Must match the ID of the worker who has most recently locked the task.
   * @param externalTaskId The ID of the external task to report a failure for.
   * @param errorMessage   A message indicating the reason of the failure.
   * @param errorDetails   A detailed error description.
   */
  handleServiceError(identity: string, workerId: string, externalTaskId: string, errorMessage: string, errorDetails: string): Promise<void>;

  /**
   *
   * Completes an external task by ID and updates process variables.
   *
   * @async
   * @param identity           The requesting users identity. Should usually be an auth token.
   * @param workerId       The ID of the worker that completes the task. Must match the ID of the worker who has most recently locked the task.
   * @param externalTaskId The ID of the external task to finish.
   * @param payload        The payload containing the process variables to update.
   */
  finishExternalTask<TPayload>(identity: string, workerId: string, externalTaskId: string, payload: TPayload): Promise<void>;
}
