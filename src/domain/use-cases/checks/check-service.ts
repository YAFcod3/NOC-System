import { LogEntity, LogsSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      this.logRepository.saveLog(
        new LogEntity(`Service ${url} working`, LogsSeverityLevel.low)
      );
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      this.logRepository.saveLog(
        new LogEntity(`url is not ok. ${error} `, LogsSeverityLevel.high)
      );
      this.errorCallback && this.errorCallback(`url is not ok. ${error} `);

      return false;
    }
  }
}
