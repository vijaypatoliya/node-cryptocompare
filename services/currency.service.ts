import { Currency } from '../models/currency';

/** find All Currency List By Filter*/
const findByFilter = async (filter: any) => {
    try {
        return await Currency.findAll({ where: filter });
    } catch (e) {
        throw new Error(e)
    }
}

/** Upsert Currency Data*/
const upsert = async (filter: any, dataObj: object) => {
    try {
        let currencyObj: any = await Currency.findOne({ where: filter });
        if (currencyObj) return currencyObj.update(dataObj);
        return Currency.create(dataObj);
    } catch (e) {
        throw new Error(e)
    }
}

export {
    findByFilter,
    upsert,
}