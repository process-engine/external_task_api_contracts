namespace ProcessEngine.ExternalTaskAPI.Contracts
{
    /// <summary>
    /// Interface for an factory for creating ExternalTaskAPI services.
    /// </summary>
    public interface IExternalTaskAPIFactory
    {
    
        /// <summary>
        /// Factory method for creating an ExternalTaskAPI service.
        /// </summary>
        /// <returns>The ExternalTaskAPIService.</returns>
        /// <param name="processEngineAddress">The address of the process engine. This address is specific to the used process engine.</param>
        IExternalTaskAPI CreateExternalTaskAPIService(string processEngineAddress);
    }
}