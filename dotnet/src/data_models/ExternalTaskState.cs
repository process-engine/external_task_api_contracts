namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    /// <summary>
    /// Describes all possible states that an ExternalTask can be in.
    /// </summary>
    public enum ExternalTaskState {
        /// <summary>
        /// The ExternalTask is finished.
        /// </summary>
        finished = 0,
        /// <summary>
        /// The ExternalTask is not yet finished.
        /// </summary>
        pending = 1,
    }
}
