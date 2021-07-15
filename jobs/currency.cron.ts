import { getCurrencyData } from '../services/cryptoCompare.service';
import { cryptoCompare } from '../constants/app.constants';
import { upsert } from '../services/currency.service';
import { sendSocketEvents } from '../webSocket/index';

const init = async () => {
    try {
        /** Get Currency data from crypto compare api */
        const currencyData = await getCurrencyData();
        const createData: any[] = [];

        /** Prepare currency data for add into db */
        cryptoCompare.fromSymbol.forEach((oneFromSymbol) => {
            cryptoCompare.toSymbol.forEach((oneToSymbol) => {
                createData.push({
                    fromSymbol: oneFromSymbol,
                    toSymbol: oneToSymbol,
                    raw: currencyData.RAW[oneFromSymbol][oneToSymbol],
                    display: currencyData.DISPLAY[oneFromSymbol][oneToSymbol],
                })
            });
        });
        for (const createObj of createData) {
            /** Upsert data into db */
            await upsert({ fromSymbol: createObj.fromSymbol, toSymbol: createObj.toSymbol }, createObj)
        }
        /** Brodcast updated currency to all web sockets */
        await sendSocketEvents(undefined, 'brodcastAll', 'service-price', currencyData)
        return;
    } catch (error) {
        throw new Error(error.message)
    }
}
const cronName = 'CURRENCY_SYNC';

export default {
    init,
    cronName,
}
