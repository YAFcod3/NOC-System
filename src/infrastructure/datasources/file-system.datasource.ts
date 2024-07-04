import {LogDatasource} from "../../domain/datasources/log.datasource";
import {LogEntity, LogsSeverityLevel} from "../../domain/entities/log.entity";
import * as fs from "node:fs";

export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/'
    private readonly allLogPath = 'logs/logs-low.log'
    private readonly mediumLogPath = 'logs/logs-medium.log'
    private readonly highLogPath = 'logs/logs-high.log'

    constructor() {
        this.createLogsFile()
    }

    private createLogsFile = () => {
        [
            this.mediumLogPath,
            this.highLogPath,
            this.allLogPath
        ].forEach(path => {
            if (fs.existsSync(path)) return
            fs.writeFileSync(path, '')
        })
    }

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getLogs(severityLevel: LogsSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}