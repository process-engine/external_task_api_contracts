import {ExternalTask} from './data_models/external_task';

/**
 * The repository used to store and retrieve ExternalTasks.
 */
export interface IExternalTaskRepository {

  /**
   * Creates a new ExternalTask in the database.
   *
   * @async
   * @param topic              The ExternalTasks topic.
   * @param correlationId      The ID of the Correlation that contains the
   *                           FlowNodeInstance with the ExternalTasks definition.
   * @param processInstanceId  The ID of the ProcessInstance that contains the
   *                           FlowNodeInstance with the ExternalTasks definition.
   * @param flowNodeInstanceId The ID of the FlowNodeInstance that contains the
   *                           ExternalTasks definition.
   * @param payload            Contains data that the ExternalTaskAPI will need
   *                           for processing the ExternalTask.
   */
  create(topic: string, correlationId: string, processInstanceId: string, flowNodeInstanceId: string, payload: any): Promise<void>;

  /**
   *
   * Fetches the tasks available for a particular (external) service and locks
   * them for a defined time.
   *
   * @async
   * @param   workerId           The ID of the worker on whose behalf tasks are
   *                             fetched.
   *                             The returned tasks are locked for that worker
   *                             and can only be completed when providing the
   *                             same worker id.
   * @param   topicName          The name of the topic. This topic is used to get
   *                             the tasks for an external worker from the BPMN.
   * @param   maxTasks           The maximum number of tasks to return.
   * @param   longPollingTimeout The Long Polling timeout in milliseconds.
   * @param   lockDuration       The amount of time in ms until the fetched tasks
   *                             will be locked and inaccessible to other workers.
   * @returns                    A list of fetched and locked ExternalTasks.
   * @throws                     403, if the requesting User is forbidden to
   *                             access ExternalTasks.
   */
  fetchAndLockExternalTasks(workerId: string,
                            topicName: string,
                            maxTasks: number,
                            longPollingTimeout: number,
                            lockDuration: number): Promise<Array<ExternalTask>>;

  /**
   *
   * Extends the timeout of a lock by a given amount of time.
   *
   * @async
   * @param workerId           The ID of a worker who is locking the ExternalTask.
   * @param externalTaskId     The ID of the ExternalTask.
   * @param additionalDuration The additional amount of time by which to extend
   *                           the lock, based on the current datetime.
   * @throws                   403, if the requesting User is forbidden to access
   *                           the ExternalTask.
   * @throws                   404, if the ExternalTask was not found.
   */
  extendLock(workerId: string, externalTaskId: string, additionalDuration: number): Promise<void>;

  /**
   *
   * Reports a business error in the context of a running ExternalTask
   * with a specific ID.
   * The error code must be specified to identify the BPMN error handler.
   *
   * @async
   * @param workerId       The ID of the worker that reports the failure.
   *                       Must match the ID of the worker who has most recently
   *                       locked the task.
   * @param externalTaskId The ID of the ExternalTask, in whose context a BPMN
   *                       error has occured.
   * @param errorCode      An error code that indicates the predefined error.
   *                       This is used to identify the BPMN error handler.
   * @throws               403, if the requesting User is forbidden to access
   *                       the ExternalTask.
   * @throws               404, if the ExternalTask was not found.
   */
  handleBpmnError(workerId: string, externalTaskId: string, errorCode: string): Promise<void>;

  /**
   *
   * Reports a failure to execute an ExternalTask with a specific ID.
   * A number of retries and a timout, after which task execution is finally
   * aborted, can be specified.
   * If retries are set to 0, an incident for this task is created.
   *
   * @async
   * @param workerId       The ID of the worker that reports the failure.
   *                       Must match the ID of the worker that has most
   *                       recently locked the task.
   * @param externalTaskId The ID of the ExternalTask to report a failure for.
   * @param errorMessage   A message indicating the reason for the failure.
   * @param errorDetails   A detailed error description.
   * @throws               403, if the requesting User is forbidden to access
   *                       the ExternalTask.
   * @throws               404, if the ExternalTask was not found.
   */
  handleServiceError(workerId: string, externalTaskId: string, errorMessage: string, errorDetails: string): Promise<void>;

  /**
   *
   * Completes an ExternalTask by ID and updates any related process variables.
   *
   * @async
   * @param  workerId       The ID of the worker that completes the task.
   *                        Must match the ID of the worker who has most
   *                        recently locked the task.
   * @param  externalTaskId The ID of the ExternalTask to finish.
   * @param  result         The result of the ExternalTasks execution.
   * @throws                403, if the requesting User is forbidden to access
   *                        the ExternalTask.
   * @throws                404, if the ExternalTask was not found.
   */
  finishExternalTask(workerId: string, externalTaskId: string, result: any): Promise<any>;
}
