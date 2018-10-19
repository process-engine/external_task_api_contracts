
import {IIdentity} from '@essential-projects/iam_contracts';
import {
  IHandleExternalTaskResult,
  IExternalTaskApi
} from '.';

export class ExternalTaskFinished<TResult> implements IHandleExternalTaskResult {
  private readonly _identity: IIdentity;
  private readonly _workerId: string;
  private readonly _externalTaskId: string;
  private readonly _result: TResult;

  constructor(
    identity: IIdentity,
    workerId: string,
    externalTaskId: string,
    result: TResult) {

    this._identity = identity;
    this._workerId = workerId;
    this._externalTaskId = externalTaskId;
    this._result = result;
  }

  public async applyTo(externalTaskApi: IExternalTaskApi): Promise<void> {
    await externalTaskApi.finishExternalTask(this._identity, this._workerId, this._externalTaskId, this._result);
  }
}
