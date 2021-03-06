﻿namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using EssentialProjects.IAM.Contracts;

    /// <summary>
    /// Service for process engine external task execution. External tasks are tasks in a process flow that are executed by an external service.
    /// In order to execute them the service has to poll the tasks/jobs and report the result back to the process engine (process variables or errors).
    /// </summary>
    public interface IExternalTaskAPI : IDisposable
    {
        /// <summary>
        /// Fetches the tasks available for a particular (external) service and locks them for a defined time.
        /// </summary>
        /// <returns>A list of external tasks.</returns>
        /// <param name="identity">The requesting users identity. Should usually be an auth token.</param>
        /// <param name="workerId">The ID of the worker on which behalf tasks are fetched. The returned tasks are locked for that worker and can only be completed when providing the same worker id.</param>
        /// <param name="topicName">The name of the topic. This topic is used to get the tasks for an external worker from the BPMN.</param>
        /// <param name="maxTasks">The maximum number of tasks to return.</param>
        /// <param name="longPollingTimeout">The Long Polling timeout in milliseconds. Note: The value cannot be set larger than 1.800.000 milliseconds(corresponds to 30 minutes).</param>
        /// <param name="lockDuration">The duration of the lock. The task will be locked for the calling worker by this duration and cannot be fetched by other workers until the lock has expired.</param>
        /// <typeparam name="TPayload">An object with public fields used as payload for external tasks. All public fields are converted into process variables using the name and value of the field.</typeparam>
        Task<IEnumerable<ExternalTask<TPayload>>> FetchAndLockExternalTasks<TPayload>(IIdentity identity, string workerId, string topicName, int maxTasks, int longPollingTimeout, int lockDuration)
            where TPayload : new();

        /// <summary>
        /// Extends the timeout of a lock by a given amount of time.
        /// </summary>
        /// <param name="identity">The requesting users identity. Should usually be an auth token.</param>
        /// <param name="workerId">The ID of a worker who is locking the external task.</param>
        /// <param name="externalTaskId">The ID of the external task.</param>
        /// <param name="additionalDuration">An amount of time (in milliseconds). This is the new lock duration starting from the current moment.</param>
        Task ExtendLock(IIdentity identity, string workerId, string externalTaskId, int additionalDuration);

        /// <summary>
        /// Reports a business error in the context of a running external task by ID. The error code must be specified to identify the BPMN error handler.
        /// </summary>
        /// <param name="identity">The requesting users identity. Should usually be an auth token.</param>
        /// <param name="workerId">The ID of the worker that reports the failure. Must match the ID of the worker who has most recently locked the task.</param>
        /// <param name="externalTaskId">The ID of the external task in which context a BPMN error is reported.</param>
        /// <param name="errorCode">An error code that indicates the predefined error. Is used to identify the BPMN error handler.</param>
        Task HandleBpmnError(IIdentity identity, string workerId, string externalTaskId, string errorCode);

        /// <summary>
        /// Reports a failure to execute an external task by ID. A number of retries and a timeout until the task can be retried can be specified. If retries are set to 0, an incident for this task is created.
        /// </summary>
        /// <param name="identity">The requesting users identity. Should usually be an auth token.</param>
        /// <param name="workerId">The ID of the worker that reports the failure. Must match the ID of the worker who has most recently locked the task.</param>
        /// <param name="externalTaskId">The ID of the external task to report a failure for.</param>
        /// <param name="errorMessage">A message indicating the reason of the failure.</param>
        /// <param name="errorDetails">A detailed error description.</param>
        Task HandleServiceError(IIdentity identity, string workerId, string externalTaskId, string errorMessage, string errorDetails);

        /// <summary>
        /// Completes an external task by ID and updates process variables.
        /// </summary>
        /// <param name="identity">The requesting users identity. Should usually be an auth token.</param>
        /// <param name="workerId">The ID of the worker that completes the task. Must match the ID of the worker who has most recently locked the task.</param>
        /// <param name="externalTaskId">The ID of the external task to finish.</param>
        /// <param name="payload">The payload containing the process variables to update.</param>
        /// <typeparam name="TPayload">An object with public fields used as payload for external tasks. All public fields are converted into process variables using the name and value of the field.</typeparam>
        Task FinishExternalTask<TPayload>(IIdentity identity, string workerId, string externalTaskId, TPayload payload);
    }
}
