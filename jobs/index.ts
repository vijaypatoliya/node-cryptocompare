import { CronJob } from 'cron'
import * as cronConfig from '../constants/cron.constants';
import config from '../config';

/** Import Jobs */
import currencyCron from './currency.cron';

const initiateCron = async (init: any, cronName: string) => {
    try {
        const cronConfigObj = cronConfig[cronName];
        if (!cronConfigObj) {
            console.log(`###${cronName} job can not initiated due to missing config`);
            return;
        }
        if (cronConfigObj.jobRestrictEnv.includes(config.NODE_ENV)) {
            console.log(`###${cronName} job can not start due to :%o enviroment `, config.NODE_ENV)
            return;
        };
        console.log(`${cronName} cronJob initiated successfully`)
       const job= new CronJob(`
            ${cronConfigObj.seconds}
            ${cronConfigObj.minutes}
            ${cronConfigObj.hours}
            ${cronConfigObj.dayOfMonth}
            ${cronConfigObj.months}
            ${cronConfigObj.dayOfWeek}`, (async () => {
            try {
                await init()
                await job.start()
                console.log(`###${cronName} job finished successfully!`)
            } catch (e) {
            }
        }), undefined, true
        )
    } catch (e) {
        throw new Error(e.message)
    }
}

/** Called Imported Jobs */
(() => {
    initiateCron(currencyCron.init, currencyCron.cronName);
})();