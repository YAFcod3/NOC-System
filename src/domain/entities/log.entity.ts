export enum LogsSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogsSeverityLevel;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogsSeverityLevel;
  public message: string;
  public createdAt?: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, origin, createdAt } = JSON.parse(json);
    const log = new LogEntity({
      message,
      level,
      origin,
      createdAt,
    });
    log.createdAt = new Date(createdAt);
    return log;
  };
}
