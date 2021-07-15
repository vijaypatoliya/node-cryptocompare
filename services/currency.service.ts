import { Op } from 'sequelize';

import { Currency } from '../models/currency';
import { getCurrencyData } from '../services/cryptoCompare.service';

/** find All Currency List By Filter */
const findByFilter = async (filter: any) => {
    try {
        return await Currency.findAll({ where: filter });
    } catch (e) {
        throw new Error(e)
    }
}

/** Upsert Currency Data */
const upsert = async (filter: any, dataObj: object) => {
    try {
        const currencyObj: any = await Currency.findOne({ where: filter });
        if (currencyObj) return currencyObj.update(dataObj);
        return Currency.create(dataObj);
    } catch (e) {
        throw new Error(e)
    }
}

/** Get Price Object */
const getPriceObj = async (bodyObj: any = {}) => {
    try {
        const { fsyms, tsyms } = bodyObj;
        if (!fsyms || !tsyms) throw new Error('Currency Params are required');

        let response: any = { RAW: {}, DISPLAY: {} };
        try {
            /** Get Currency data from crypto compare api */
            response = await getCurrencyData({ fsyms, tsyms });
        } catch (err) {
        }
        if (response.RAW) return response

        const filter = {
            fromSymbol: {
                [Op.in]: fsyms.split(','),
            },
            toSymbol: {
                [Op.in]: tsyms.split(','),
            },
        };
        /** Get Currency data from db */
        const currencyList = await findByFilter(filter);

        /** Prepare Reposne Object */
        currencyList.forEach((currency) => {
            if (!response.RAW[currency.fromSymbol]) response.RAW[currency.fromSymbol] = {}
            if (!response.DISPLAY[currency.fromSymbol]) response.DISPLAY[currency.fromSymbol] = {}
            response.RAW[currency.fromSymbol][currency.toSymbol] = currency.raw
            response.DISPLAY[currency.fromSymbol][currency.toSymbol] = currency.display
        })
        return response
    } catch (e) {
        throw new Error(e);
    }
}

export {
    findByFilter,
    upsert,
    getPriceObj
}
