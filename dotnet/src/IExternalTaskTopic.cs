namespace ProcessEngine.ExternalTaskAPI.Contracts
{

    /// <summary>
    /// External task topic.
    /// </summary>
    public interface IExternalTaskTopic
    {
        /// <summary>
        /// Gets or sets the name of the topic. This topic is used to get the tasks for an external worker from the BPMN.
        /// </summary>
        /// <value>The name of the topic.</value>
        string TopicName { get; set; }

        /// <summary>
        /// Gets or sets the duration of the lock. The task will be locked for the calling worker by this duration and cannot be fetched by other workers until the lock has expired.
        /// </summary>
        /// <value>The duration of the lock.</value>
        int LockDuration { get; set; }
    }
}
