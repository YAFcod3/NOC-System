import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugin";
// import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogsSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  // from: string;
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(
    // private readonly logRepository: LogRepository
  ) {}

  async sendMail(options: SendMailOptions) {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments: attachments,
      });
      console.log(sendInformation);
      const log = new LogEntity({
        message: `Email sent`,
        level: LogsSeverityLevel.low,
        origin: "email.service.ts",
        createdAt: new Date(),
      });
      // this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `Email not sent`,
        level: LogsSeverityLevel.high,
        origin: "email.service.ts",
        createdAt: new Date(),
      });
      // this.logRepository.saveLog(log);
      return false;
    }
  }

  sendEmailWithSystemLogs(to: string | string[]) {
    const subject = "Logs del sistema";

    const htmlBody = `
    <h1>Logs del sistema</h1>
    <p>Los logs se encuentran en el archivo logs/logs-all.log</p>
    <p>Los logs de alto nivel se encuentran en el archivo logs/logs-high.log</p>
    `;

    const attachments = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ];
    return this.sendMail({ to, subject, htmlBody, attachments });
  }
}
