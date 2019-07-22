namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    using System;
    using System.Threading.Tasks;

    using EssentialProjects.IAM.Contracts;

    /// <summary>
    /// Contains the execution result for an ExternalTask.
    /// </summary>
    public interface IExternalTaskResult
    {
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
        Task SendToExternalTaskApi(IExternalTaskAPI externalTaskAPI, IIdentity identity, string workerId);
    }
}
