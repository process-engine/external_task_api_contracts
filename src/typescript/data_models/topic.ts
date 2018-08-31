/**
 * External task topic to assign the tasks to external workers.
 */
export class Topic {
  /**
   * Gets or sets the name of the topic. This topic is used to get the tasks for an external worker from the BPMN.
   */
  public topicName: string;
  /**
   * Gets or sets the duration of the lock. The task will be locked for the calling worker by this duration and
   * cannot be fetched by other workers until the lock has expired.
   */
  public lockDuration: number;
}
