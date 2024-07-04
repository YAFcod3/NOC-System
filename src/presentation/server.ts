import {CronService} from "./cron/cron-service";
import {CheckService} from "../domain/use-cases/checks/check-service";

export class Server {
    public static start() {
        console.log('server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://localhost:3000'
                new CheckService(() => console.log('success'), (error) => console.log(error))
                    .execute(url)
            },
        )
    }


}