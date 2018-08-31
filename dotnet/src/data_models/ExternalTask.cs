namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    /// <summary>
    /// An external task the engine is providing for external services to process.
    /// </summary>
    public class ExternalTask<TPayload>
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="payload">The payload for the external tasks.</param>
        public ExternalTask(TPayload payload)
        {
            Payload = payload;
        }

        /// <summary>
        /// The process variables and token data to use and process by the external task
        /// </summary>
        /// <value>The payload.</value>
        public TPayload Payload { get; }

        /// <summary>
        /// The Id of the external task.
        /// </summary>
        public string Id;

        /// <summary>
        /// The activity Id in the process model.
        /// </summary>
        public string ActivityId;

        /// <summary>
        /// The correlation Id in which the process is running.
        /// </summary>
        public string CorrelationId;

        /// <summary>
        /// The process instance Id.
        /// </summary>
        public string ProcessInstanceId;

        /// <summary>
        /// The worker Id of the external task. The process engine locks the task for this worker for processing.
        /// </summary>
        public string WorkerId;

        /// <summary>
        /// The lock expiration time after that the task is released to be processed by other services.
        /// </summary>
        public string LockExpirationTime;

        /// <summary>
        /// The full error message submitted with the latest reported failure executing this task.
        /// </summary>
        public string ErrorMessage;

        /// <summary>
        /// The error details submitted with the latest reported failure executing this task.
        /// </summary>
        public string ErrorDetails;
    }
}
