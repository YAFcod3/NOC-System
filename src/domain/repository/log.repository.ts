import {LogEntity, LogsSeverityLevel} from "../entities/log.entity";

export abstract class LogRepository {

    abstract saveLog(log: LogEntity): Promise<void>
    abstract getLogs(severityLevel: LogsSeverityLevel): Promise<LogEntity[]>

}