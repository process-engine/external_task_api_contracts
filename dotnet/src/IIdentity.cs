namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    /// <summary>
    /// Interface for User Identity
    /// </summary>
    public interface IIdentity
    {
        /// <summary>
        /// String representation of Identity Token
        /// </summary>
        string Token { get; }
    }
}
