namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// The repository used to store and retrieve ExternalTasks.
    /// </summary>
    public interface IExternalTaskRepository : IDisposable {

      /// <summary>
      /// Creates a new ExternalTask in the database.
      /// </summary>
      /// <param name="topic">
      /// The ExternalTasks topic.
      /// </param>
      /// <param name="correlationId">
      /// The ID of the Correlation that contains the FlowNodeInstance with the
      /// ExternalTasks definition.
      /// </param>
      /// <param name="processInstanceId">
      /// The ID of the ProcessInstance that contains the FlowNodeInstance with
      /// the ExternalTasks definition.
      /// </param>
      /// <param name="flowNodeInstanceId">
      /// The ID of the FlowNodeInstance that contains the ExternalTasks
      /// definition.
      /// </param>
      /// <param name="payload">
      /// Contains data that the ExternalTaskAPI will need for processing the
      /// ExternalTask.
      /// </param>

      Task Create<TPayload>(string topic, string correlationId, string processInstanceId, string flowNodeInstanceId, TPayload payload);

      /// <summary>
      /// Gets an ExternalTask by its ID.
      /// </summary>
      /// <returns>
      /// The retrieved ExternalTask.
      /// </returns>
      /// <param name="externalTaskId">
      /// The ID of the ExternalTask to get.
      /// </param>
      /// <exception>
      /// 404, if the ExternalTask was not found.
      /// </exception>

      Task<ExternalTask<TPayload>> GetById<TPayload>(string externalTaskId);

      /// <summary>
      /// Fetches all tasks with a matching topic that are currently available
      /// for processing.
      /// </summary>
      /// <returns>
      /// A list of fetched and locked ExternalTasks.
      /// </returns>
      /// <param name="topicName">
      /// The name of the topic. This topic is used to get the tasks for an
      /// external worker from the BPMN.
      /// </param>
      /// <param name="maxTasks">
      /// The maximum number of tasks to return.
      /// </param>

      Task<ExternalTask<TPayload>[]> FetchAvailableForProcessing<TPayload>(string topicName, int maxTasks);

      /// <summary>
      /// Fetches the tasks available for a particular (external) service and locks
      /// them for a defined time.
      /// </summary>
      /// <returns>
      /// A list of fetched and locked ExternalTasks.
      /// </returns>
      /// <param name="workerId">
      /// The ID of the worker on whose behalf the ExternalTask is locked.
      /// </param>
      /// <param name="externalTaskId">
      /// The ID of the ExternalTask to lock.
      /// </param>
      /// <param name="lockExpirationTime">
      /// The time at which the lock will be released.
      /// </param>
      /// <exception>
      /// 404, if the ExternalTask was not found.
      /// </exception>

      Task LockForWorker(string workerId, string externalTaskId, DateTime lockExpirationTime);

      /// <summary>
      /// Marks the given ExternalTask as finished, using the given error object
      /// as a failure result.
      /// </summary>
      /// <param name="externalTaskId">
      /// The ID of the ExternalTask, in whose context a BPMN error has occured.
      /// </param>
      /// <param name="error">
      /// The error that occured.
      /// </param>
      /// <exception>
      /// 404, if the ExternalTask was not found.
      /// </exception>
      Task FinishWithError(string externalTaskId, Exception error);

      /// <summary>
      /// Marks the given ExternalTask as finished, using the given object
      /// as a success result.
      /// </summary>
      /// <param name=" externalTaskId">
      /// The ID of the ExternalTask to finish.
      /// </param>
      /// <param name=" result">
      /// The result of the ExternalTasks execution.
      /// </param>
      /// <exception>
      /// 404, if the ExternalTask was not found.
      /// </exception>
      Task FinishWithSuccess(string externalTaskId, object result);
    }
}
