import {IIdentity} from '@essential-projects/iam_contracts';

import {IExternalTaskApi} from '.';

export interface IHandleExternalTaskResult {
  applyTo(externalTaskApi: IExternalTaskApi, identity: IIdentity, workerId: string): Promise<void>;
}
