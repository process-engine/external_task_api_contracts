namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    /// <summary>
    /// Interface for an factory for creating ExternalTaskAPI services.
    /// </summary>
    public interface IExternalTaskAPIFactory
    {
        /// <summary>
        /// Factory method for creating an ExternalTaskAPIService.
        /// </summary>
        /// <returns>The ExternalTaskAPIService.</returns>
        /// <param name="processEngineAPIBaseUrl">The base URL of the process engine.</param>
        /// <param name="userAgent">The user agent to put in the HTTP header.</param>
        IExternalTaskAPIService CreateExternalTaskAPIService(string processEngineAPIBaseUrl, string userAgent);
    }
}