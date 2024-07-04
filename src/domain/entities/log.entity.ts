export enum LogsSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    public level: LogsSeverityLevel;
    public message: string;
    public createdAt: Date

    constructor(message: string, level: LogsSeverityLevel) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date()
    }
}