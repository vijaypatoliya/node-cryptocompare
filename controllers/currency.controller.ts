import { Request, Response } from 'express';

import { getPriceObj } from '../services/currency.service';

/** Get Currency Price List */
const getPrice = async (req: Request, res: Response) => {
    try {
        const { fsyms, tsyms } = req.query;
        /** Get Currency Price  */
        const response = await getPriceObj({ fsyms, tsyms })
        return res.json(response)
    } catch (e) {
        return res.status(403).send(e.message)
    }
}

export { getPrice }
