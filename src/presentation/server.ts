// import { CronService } from "./cron/cron-service";
// import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("server started...");

    // mandar email
    const emailService = new EmailService();
    emailService.sendMail({
      to: "yasmaniarmas1995@gmail.com",
      subject: "Logs del sistema",
      htmlBody: `
        <h1>Logs del sistema</h1>
        <p>Los logs se encuentran en el archivo logs/logs-all.log</p>
        <p>Los logs de alto nivel se encuentran en el archivo logs/logs-high.log</p>
        `,
    });

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com/";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
