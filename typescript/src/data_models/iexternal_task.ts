import {ExternalTaskState} from './external_task_state';

export interface IExternalTask {
  id: string;
  workerId?: string;
  topic: string;
  flowNodeInstanceId: string;
  correlationId: string;
  processInstanceId: string;
  lockExpirationTime?: Date;
  isLocked?: boolean;
  payload: any;
  state: ExternalTaskState;
  finishedAt?: Date;
  result?: any;
  error?: any;
  createdAt?: Date;
}
