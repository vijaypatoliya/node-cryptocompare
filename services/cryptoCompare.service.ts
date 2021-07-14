import request from 'request-promise';
import { cryptoCompare } from '../constants/app.constants';

const getCurrencyData = async (qs?: any) => {
    try {
        const options = {
            url: cryptoCompare.apiUri,
            qs: qs || {
                fsyms: cryptoCompare.fromSymbol.join(','),
                tsyms: cryptoCompare.toSymbol.join(','),
            },
            method: 'GET'
        }
        const result = await request(options)
        return typeof result === 'string' ? JSON.parse(result) : result
    } catch (e) {
        throw new Error(e)
    }

}

export { getCurrencyData }