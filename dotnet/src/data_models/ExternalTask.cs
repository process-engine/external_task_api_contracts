namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    using System;

    /// <summary>
    /// Describes an ExternalTask that the ProcessEngine has delegated to an
    /// ExternalTask worker for processing.
    /// </summary>
    public class ExternalTask<TPayload>
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="payload">The payload for the ExternalTask.</param>
        public ExternalTask(TPayload payload)
        {
            Payload = payload;
        }

        /// <summary>
        /// The Id of the ExternalTask.
        /// </summary>
        public string Id;

        /// <summary>
        /// The ID of the worker that has most recently locked the ExternalTask
        /// for processing.
        /// </summary>
        public string WorkerId;

        /// <summary>
        /// Contains the topic this ExternalTask is associated with.
        /// </summary>
        public string Topic;

        /// <summary>
        /// The ID of the Activity that contains the definition of the
        /// ExternalTask.
        /// </summary>
        public string ActivityId;

        /// <summary>
        /// The ID of the correlation that contains the activity with the
        /// ExternalTask's definition.
        /// </summary>
        public string CorrelationId;

        /// <summary>
        /// The ID of the ProcessInstance that contains the activity with the
        /// ExternalTask's definition.
        /// </summary>
        public string ProcessInstanceId;

        /// <summary>
        /// The payload containing all relevant data the worker needs to execute
        /// the ExternalTask.
        /// </summary>
        /// <value>The payload.</value>
        public TPayload Payload { get; }

        /// <summary>
        /// The lock expiration time. On expiration, the task is released to
        /// be processed by other workers.
        /// If not set, the ExternalTask is not locked.
        /// </summary>
        public Nullable<DateTime> LockExpirationTime;

        /// <summary>
        /// Uses the defined LockExpirationTime to determine if the ExternalTask
        /// is currently locked.
        /// </summary>
        /// <value></value>
        public bool IsLocked {
          get {
            if (this.LockExpirationTime == null) {
              return false;
            }

            var now = DateTime.Now;

            return this.LockExpirationTime > now;
          }
        }

        /// <summary>
        /// Describes the state the ExternalTask is currently in.
        /// Default state is "pending".
        /// </summary>
        public ExternalTaskState State = ExternalTaskState.pending;

        /// <summary>
        /// Contains the Date and Time at wich the ExternalTask was finished.
        /// If not set, the ExternalTask has not been finished yet.
        /// </summary>
        public Nullable<DateTime> FinishedAt;

        /// <summary>
        /// If the ExternalTask was finished successfully, this will contain the
        /// ExteralTask's result.
        /// </summary>
        public object Result;

        /// <summary>
        /// If the ExternalTask was finished with an error, this will contain
        /// the errors message.
        /// </summary>
        public string ErrorMessage;

        /// <summary>
        /// /// If the ExternalTask was finished with an error, this will contain
        /// the errors details.
        /// </summary>
        public string ErrorDetails;

        /// <summary>
        /// The Date and Time at which the ExternalTask was created.
        /// </summary>
        public DateTime CreatedAt;
    }
}
