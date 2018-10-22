import {IIdentity} from '@essential-projects/iam_contracts';

import {IExternalTaskApi} from '.';

/**
 * Result of handling ExternalTasks
 */
export interface IExternalTaskResult {

  /**
   * Process result with ExternalTaskApi
   *
   * @async
   * @param externalTaskApi    Service for handling external Task.
   * @param identity           IIdentity to fetch Tasks for.
   * @param workerId           Id of the Worker with handled this tasks.
   */
  sendToExternalTaskApi(externalTaskApi: IExternalTaskApi, identity: IIdentity, workerId: string): Promise<void>;
}
