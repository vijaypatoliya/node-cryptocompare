import * as currencyService from '../../services/currency.service'

const successTests = {
    getPriceObj: async (bodyObj: object) => {
        let currencyObj = await currencyService.getPriceObj(bodyObj);
        expect(currencyObj).toHaveProperty('RAW');
        expect(currencyObj).toHaveProperty('DISPLAY');
    }
}

describe('Currency Service', () => {
    it('get Currency PriceObj', async () => {
        await successTests.getPriceObj({ fsyms: 'BTC, XRP', tsyms: 'USD,EUR' });
    });
});

