/**
 * An ExternalTask, the ProcessEngine is providing for external services to
 * process.
 */
export class ExternalTask {
  /**
   * The process variables and token data to use by the ExternalTask service.
   */
  public payload: any;
  /**
   * The ID of the ExternalTask.
   */
  public id: string;
  /**
   * The FlowNodeIstance ID in the ProcessModel.
   */
  public flowNodeInstanceId: string;
  /**
   * The ID of the Correlation the ProcessInstance belongs to.
   */
  public correlationId: string;
  /**
   * The ProcessInstanceId.
   */
  public processInstanceId: string;
  /**
   * The worker ID of the ExternalTask.
   * The Processengine locks the task for this worker to process.
   */
  public workerId: string;
  /**
   * The lock expiration time. On expiration, the task is released to
   * be processed by other workers.
   */
  public lockExpirationTime: Date;
}
