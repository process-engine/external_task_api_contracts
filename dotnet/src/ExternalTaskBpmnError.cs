namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    using System;
    using System.Threading.Tasks;

    using EssentialProjects.IAM.Contracts;

    /// <summary>
    /// Contains the result set for a successfully executed ExternalTask.
    /// </summary>
    public class ExternalTaskBpmnError : IExternalTaskResult
    {
        private readonly string externalTaskId;
        private readonly string errorCode;

        /// <summary>
        /// Creates a new Instace of ExternalTaskBpmnError
        /// </summary>
        /// <param name="externalTaskId">
        /// Id of the ExternalTask
        /// </param>
        /// <param name="errorCode">
        /// ErrorCode of executing ExternalTask
        /// </param>
        public ExternalTaskBpmnError(string externalTaskId, string errorCode)
        {
            this.externalTaskId = externalTaskId;
            this.errorCode = errorCode;
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
            await externalTaskAPI.HandleBpmnError(identity, workerId, this.externalTaskId, this.errorCode);
        }
    }
}
