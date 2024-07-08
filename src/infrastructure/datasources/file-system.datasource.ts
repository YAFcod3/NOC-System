import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogsSeverityLevel } from "../../domain/entities/log.entity";
import * as fs from "node:fs";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogPath = "logs/logs-all.log";
  private readonly mediumLogPath = "logs/logs-medium.log";
  private readonly highLogPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    [this.mediumLogPath, this.highLogPath, this.allLogPath].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    // agrega una nueva linea al final
    fs.appendFileSync(this.allLogPath, logAsJson);
    if (newLog.level === LogsSeverityLevel.low) return;
    if (newLog.level === LogsSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogPath, logAsJson);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("/n").map((log) => LogEntity.fromJson(log));
    return logs;
  };

  async getLogs(severityLevel: LogsSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogsSeverityLevel.low:
        return this.getLogsFromFile(this.allLogPath);
      case LogsSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogPath);
      case LogsSeverityLevel.high:
        return this.getLogsFromFile(this.highLogPath);
      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
