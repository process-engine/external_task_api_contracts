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
   * Gets an ExternalTask by its ID.
   *
   * @async
   * @param   externalTaskId The ID of the ExternalTask to get.
   * @returns                The retrieved ExternalTask.
   * @throws                 404, if the ExternalTask was not found.
   */
  getById(externalTaskId: string): Promise<ExternalTask>;

  /**
   *
   * Fetches all tasks with a matching topic that are currently available
   * for processing.
   *
   * @async
   * @param   topicName The name of the topic. This topic is used to get
   *                    the tasks for an external worker from the BPMN.
   * @param   maxTasks  The maximum number of tasks to return.
   * @returns           A list of fetched and locked ExternalTasks.
   */
  fetchAvailableForProcessing(topicName: string, maxTasks: number): Promise<Array<ExternalTask>>;

  /**
   *
   * Fetches the tasks available for a particular (external) service and locks
   * them for a defined time.
   *
   * @async
   * @param   workerId           The ID of the worker on whose behalf the
   *                             ExternalTask is locked.
   * @param   externalTaskId     The ID of the ExternalTask to lock.
   * @param   lockExpirationTime The time at which the lock will be released.
   * @returns                    A list of fetched and locked ExternalTasks.
   * @throws                     404, if the ExternalTask was not found.
   */
  lockForWorker(workerId: string, externalTaskId: string, lockExpirationTime: number): Promise<void>;

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
   * @throws                404, if the ExternalTask was not found.
   */
  finishExternalTask(workerId: string, externalTaskId: string, result: any): Promise<any>;
}
