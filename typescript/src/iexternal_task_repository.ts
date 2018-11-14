import {IIdentity} from '@essential-projects/iam_contracts';

import {ExternalTask} from './data_models/external_task';

/**
 * The repository used to store and retrieve ExternalTasks.
 *
 * NOTE: This will be moved to the RuntimeAPI contracts soon.
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
   * @param identity           The Identity of the lane where ExternalTask is in.
   * @param payload            Contains data that the ExternalTaskAPI will need
   *                           for processing the ExternalTask.
   */
  create<TPayloadType>(topic: string,
    correlationId: string,
    processInstanceId: string,
    flowNodeInstanceId: string,
    identity: IIdentity,
    payload: TPayloadType): Promise<void>;

  /**
   * Gets an ExternalTask by its ID.
   *
   * @async
   * @param   externalTaskId The ID of the ExternalTask to get.
   * @returns                The retrieved ExternalTask.
   * @throws                 404, if the ExternalTask was not found.
   */
  getById<TPayloadType>(externalTaskId: string): Promise<ExternalTask<TPayloadType>>;

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
  fetchAvailableForProcessing<TPayloadType>(topicName: string, maxTasks: number): Promise<Array<ExternalTask<TPayloadType>>>;

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
  lockForWorker(workerId: string, externalTaskId: string, lockExpirationTime: Date): Promise<void>;

  /**
   *
   * Marks the given ExternalTask as finished, using the given error object
   * as a failure result.
   *
   * @async
   * @param externalTaskId The ID of the ExternalTask, in whose context a BPMN
   *                       error has occured.
   * @param error          The error that occured.
   * @throws               404, if the ExternalTask was not found.
   */
  finishWithError(externalTaskId: string, error: Error): Promise<void>;

  /**
   * Marks the given ExternalTask as finished, using the given object
   * as a success result.
   *
   * @async
   * @param  externalTaskId The ID of the ExternalTask to finish.
   * @param  result         The result of the ExternalTasks execution.
   * @throws                404, if the ExternalTask was not found.
   */
  finishWithSuccess<TResultType>(externalTaskId: string, result: TResultType): Promise<any>;

  /**
   * Removes the External Tasks with a specific processModelId
   *
   * @async
   * @param  externalTaskId The ID of the processModel, by which the externalTasks should be removed.
   *
   */
  deleteExternalTasksByProcessModelId(processModelId: string): Promise<void>;
}
