import { Request, Response } from 'express';
import { Op } from "sequelize";
import { getCurrencyData } from '../services/cryptoCompare.service';

import { findByFilter } from '../services/currency.service';

/** Get Currency Price List */
const getPrice = async (req: Request, res: Response) => {
    try {
        const { fsyms, tsyms } = req.query;
        let response: any = { RAW: {}, DISPLAY: {} };
        try {
            /** Get Currency data from crypto compare api */
            response = await getCurrencyData({ fsyms, tsyms });
        } catch (err) {
            console.log('error while get currency data : ', err)
        }
        if (response.RAW) return res.json(response)

        const filter = {
            fromSymbol: {
                [Op.in]: fsyms.split(',')
            },
            toSymbol: {
                [Op.in]: tsyms.split(',')
            }
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
        return res.json(response)
    } catch (e) {
        console.log(e)
        return res.status(403).send(e.message)
    }
}

export { getPrice }