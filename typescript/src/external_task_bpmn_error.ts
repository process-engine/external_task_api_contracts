import {IIdentity} from '@essential-projects/iam_contracts';

import {IExternalTaskApi, IHandleExternalTaskResult} from '.';

/**
 * Result with Bpmn error of handling ExternalTasks
 */
export class ExternalTaskBpmnError implements IHandleExternalTaskResult {
  private readonly _externalTaskId: string;
  private readonly _errorCode: string;

  constructor(
    externalTaskId: string,
    errorCode: string) {
    this._externalTaskId = externalTaskId;
    this._errorCode = errorCode;
  }

  public async applyTo(externalTaskApi: IExternalTaskApi, identity: IIdentity, workerId: string): Promise<void> {
    await externalTaskApi.handleBpmnError(identity, workerId, this._externalTaskId, this._errorCode);
  }
}
