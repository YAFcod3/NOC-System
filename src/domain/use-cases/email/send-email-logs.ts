import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogsSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailUseCase {
  execute: (to: string | string[]) => void;
}

export class SendEmailLogs implements SendEmailUseCase {

  // const para inyectar repositorio
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}
  async execute(to: string | string[]) {
    console.log(to);
    try {
      const sent = await this.emailService.sendEmailWithSystemLogs(to);
      if(!sent){
        throw new Error("Email not sent");
        
      }
      const log = new LogEntity({
        message: `Log email sent`,
        level: LogsSeverityLevel.low,
        origin: "send-email-logs.ts",
      })

      this.logRepository.saveLog(log);
      return true;
      
    } catch (error) {
      const log = new LogEntity({
        message: `${error} `,
        level: LogsSeverityLevel.high,
        origin: "send-email-logs.ts",
      })

      this.logRepository.saveLog(log);

      
    }
    return true;
  }
}
