import {IIdentity} from '@essential-projects/iam_contracts';

import {IExternalTaskApi, IExternalTaskResult} from '.';

/**
 * Result of handling ExternalTasks
 */
export class ExternalTaskFinished<TResult> implements IExternalTaskResult {
  private readonly _externalTaskId: string;
  private readonly _result: TResult;

  constructor(
    externalTaskId: string,
    result: TResult) {
    this._externalTaskId = externalTaskId;
    this._result = result;
  }

  public async sendToExternalTaskApi(externalTaskApi: IExternalTaskApi, identity: IIdentity, workerId: string): Promise<void> {
    await externalTaskApi.finishExternalTask<TResult>(identity, workerId, this._externalTaskId, this._result);
  }
}
