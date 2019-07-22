namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    using System;
    using System.Threading.Tasks;

    using EssentialProjects.IAM.Contracts;

    /// <summary>
    /// Definition of the HandleExternalTask Callback.
    /// </summary>
    public delegate Task<IExternalTaskResult> HandleExternalTaskAction<TPayload>(ExternalTask<TPayload> externalTask);

    /// <summary>
    /// Periodically fetches, locks and processes ExternalTasks for a given topic.
    /// </summary>
    public interface IExternalTaskWorker
    {
        /// <summary>
        /// Id of worker
        /// </summary>
        string WorkerId { get; }

        /// <summary>
        /// Periodically fetches, locks and processes available ExternalTasks with a given topic,
        /// using the given callback as a processing function.
        /// </summary>
        /// <param name="identity">
        /// The identity to use for fetching and processing ExternalTasks.
        /// </param>
        /// <param name="topic">
        /// The topic by which to look for and process ExternalTasks.
        /// </param>
        /// <param name="maxTasks">
        /// max. ExternalTasks to fetch.
        /// </param>
        /// <param name="longpollingTimeout">
        /// Longpolling Timeout in ms.
        /// </param>
        /// <param name="handleAction">
        /// The function for processing the ExternalTasks.
        /// </param>
        Task WaitForHandle<TPayload>(
            IIdentity identity,
            string topic,
            int maxTasks,
            int longpollingTimeout,
            HandleExternalTaskAction<TPayload> handleAction
          ) where TPayload : new();
    }
}
