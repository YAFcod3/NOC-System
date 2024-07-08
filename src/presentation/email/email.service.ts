import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugin";

interface SendMailOptions {
  // from: string;
  to: string;
  subject: string;
  htmlBody: string;
  //TODO attachments:
}

// TODO Attachments
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendMail(options: SendMailOptions) {
    const { to, subject, htmlBody } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
      });
      console.log(sendInformation)
      return true;
    } catch (error) {
      return false;
    }
  }
}
