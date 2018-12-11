namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    using System;
    using System.Threading.Tasks;

    /// <summary>
    /// Contains the result set for a successfully executed ExternalTask.
    /// </summary>
    public class ExternalTaskFinished<TPayload> : IExternalTaskResult
    {
        private readonly string externalTaskId;
        private readonly TPayload result;

        /// <summary>
        /// Creates a new Instace of ExternalTaskFinished
        /// </summary>
        /// <param name="externalTaskId">
        /// Id of the ExternalTask
        /// </param>
        /// <param name="result">
        /// Result of executing ExternalTask
        /// </param>
        public ExternalTaskFinished(string externalTaskId, TPayload result)
        {
            this.externalTaskId = externalTaskId;
            this.result = result;
        }

        /// <summary>
        /// Sends the ExternalTasks result to the ExternalTaskAPI, using the given 'IExternalTaskAPI' instance.
        /// </summary>
        /// <param name="externalTaskAPI">
        /// The ExternalTaskAPI instance that should process the ExternalTasks result.
        /// </param>
        /// <param name="identity">
        /// The identity to use for sending the ExternalTasks result.
        /// </param>
        /// <param name="workerId">
        /// Id of the Worker wich handled this tasks.
        /// </param>
        public async Task SendToExternalTaskApi(IExternalTaskAPI externalTaskAPI, IIdentity identity, string workerId)
        {
            await externalTaskAPI.FinishExternalTask<TPayload>(identity, workerId, this.externalTaskId, this.result);
        }
    }
}
