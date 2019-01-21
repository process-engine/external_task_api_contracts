namespace ProcessEngine.ExternalTaskAPI.Contracts
{
  using System;

  /// <summary>
  /// Describes an Identity in ProcessEngine environment.
  /// </summary>
  public class Identity : IIdentity
  {

    /// <summary>
    /// The jwt Token of the current identity
    /// </summary>
    public string Token { get; set; }
  }
}
