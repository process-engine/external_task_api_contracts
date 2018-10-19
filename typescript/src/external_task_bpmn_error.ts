
import {IIdentity} from '@essential-projects/iam_contracts';
import {
  IHandleExternalTaskResult,
  IExternalTaskApi
} from '.';

export class ExternalTaskBpmnError implements IHandleExternalTaskResult {
  private readonly _identity: IIdentity;
  private readonly _workerId: string;
  private readonly _externalTaskId: string;
  private readonly _errorCode: string;

  constructor(
    identity: IIdentity,
    workerId: string,
    externalTaskId: string,
    errorCode: string) {

    this._identity = identity;
    this._workerId = workerId;
    this._externalTaskId = externalTaskId;
    this._errorCode = errorCode;
  }

  public async applyTo(externalTaskApi: IExternalTaskApi): Promise<void> {
    await externalTaskApi.handleBpmnError(this._identity, this._workerId, this._externalTaskId, this._errorCode);
  }
}
