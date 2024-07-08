import { LogEntity, LogsSeverityLevel } from "../entities/log.entity";

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogsSeverityLevel): Promise<LogEntity[]>;
}
