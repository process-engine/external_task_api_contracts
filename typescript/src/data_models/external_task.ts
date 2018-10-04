/**
 * An external task the engine is providing for external services to process.
 */
export class ExternalTask {
  /**
   * The process variables and token data to use and process by the external task.
   */
  public payload: any;
  /**
   * The Id of the external task.
   */
  public id: string;
  /**
   * The flownode instance Id in the process model.
   */
  public flowNodeInstanceId: string;
  /**
   * The correlation Id in which the process is running.
   */
  public correlationId: string;
  /**
   * The process instance Id.
   */
  public processInstanceId: string;
  /**
   * The worker Id of the external task. The process engine locks the task for this worker for processing.
   */
  public workerId: string;
  /**
   * The lock expiration time after that the task is released to be processed by other services.
   */
  public lockExpirationTime: Date;
}
