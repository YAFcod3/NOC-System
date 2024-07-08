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
      console.log(req);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogsSeverityLevel.low,
        origin: "check-service.ts",
      });

      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `url is not ok. ${error} `,
        level: LogsSeverityLevel.high,
        origin: "check-service.ts",
      });
      this.logRepository.saveLog(new LogEntity(log));
      this.errorCallback && this.errorCallback(`url is not ok. ${error} `);

      return false;
    }
  }
}
