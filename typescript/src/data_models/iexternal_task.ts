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
  isFinished: boolean;
  finishedAt?: Date;
  result?: any;
  error?: any;
  createdAt?: Date;
}
