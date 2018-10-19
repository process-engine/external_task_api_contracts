import {IExternalTaskApi} from '.';

export interface IHandleExternalTaskResult {
  applyTo(externalTaskApi: IExternalTaskApi): Promise<void>;
}
