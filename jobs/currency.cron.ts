import { getCurrencyData } from '../services/cryptoCompare.service';
import { cryptoCompare } from '../constants/app.constants';
import { upsert } from '../services/currency.service';

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
                    display: currencyData.DISPLAY[oneFromSymbol][oneToSymbol]
                })
            });
        });
        for (let i = 0; i < createData.length; i++) {
            /** Upsert data into db */
            await upsert({ fromSymbol: createData[i].fromSymbol, toSymbol: createData[i].toSymbol }, createData[i])
        }
        return;
    } catch (error) {
        throw new Error(error.message)
    }
}
const cronName: string = "CURRENCY_SYNC";

export default {
    init,
    cronName
}
