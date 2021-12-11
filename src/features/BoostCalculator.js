import config from '../config.json'

const rub_prices = config.prices.rub

class BoostCalc {
    constructor() {}

    calculate(currency, from, to, party, server, specHeroes, stream, promocode) {
        return new Promise((resolve, reject) => {
        //Variables
        var result = 0;
        var cleanRes = 0;
        var promocodePercent = 0;

        //Settings

        const totalMMR = (to - from)

        // Idiotentest
        if (totalMMR === null || totalMMR < 0) {
            result = -1
        } else if (to > config.max_mmr) {
            result = '🦄 For such a boost, please ask some Pro-Players'
        } else if (from > config.max_mmr) {
            result = '🦄 What a pro, do you want to work with us?'
        } else {
            //Calculation
            const obj = this.internalCalc(currency, from, to, party, stream, server, specHeroes, promocode);
            //console.log(obj)
            result = obj.result
            cleanRes = obj.cleanResult
            promocodePercent = obj.promocodePercent
        }
        if (typeof result === 'string' || result instanceof String) {
        } else if (result === -1) {
            result = 0
        } else {
            result = parseFloat(result).toFixed(2);
            cleanRes = parseFloat(cleanRes).toFixed(2);
        }

        resolve(result)
    })
    }


    internalCalc(currency, from, to, party, stream, server, specHeroes, promocode) {
        var result = 0;
        const totalMMR = (to - from)

        var value = from;
        while (value != to) {
            result += this.getPrice(value, currency);
            value++;
        }

        const cleanResult = result

        //console.log(`Price: ${result}. Before modificators`)
        if (party === true) {
            result *= (100 + config.price_modificators.party_boost) / 100
            //console.log(`Price: ${result}. After party`)

            if (stream === true) {
                result *= (100 + config.price_modificators.stream) / 100
            }
            //console.log(`Price: ${result}. After stream`)
        }
        if (specHeroes === true) { result *= (100 + config.price_modificators.spec_heroes) / 100 }
        //console.log(`Price: ${result}. After specHeroes`)

        if (server === 'SEA') { result *= (100 + config.price_modificators.serv_SEA) / 100 } else
            if (server === 'NA') { result *= (100 + config.price_modificators.serv_NA) / 100 }
        //console.log(`Price: ${result}. After regions`)

        var promocodePercent = 0;
        if (config.promocode10.includes(promocode)) {
            result *= (100 - config.price_modificators.promocode10) / 100
            promocodePercent = 10;
        } else if (config.promocode20.includes(promocode)) {
            result *= (100 - config.price_modificators.promocode20) / 100
            promocodePercent = 20;
        } else if (config.promocode30.includes(promocode)) {
            result *= (100 - config.price_modificators.promocode30) / 100
            promocodePercent = 30;
        }
        // console.log(`Promocode percent: ${promocodePercent}`)

        return { result: result, cleanResult, promocodePercent: promocodePercent };
    }

    getPrice(mmr, currency) {
        if (currency == 'RUB') {
            if (mmr < 2000) { return rub_prices['0-2000']; } else
                if (mmr < 3000) { return rub_prices['2000-3000']; } else
                    if (mmr < 3500) { return rub_prices['3000-3500']; } else
                        if (mmr < 4000) { return rub_prices['3500-4000']; } else
                            if (mmr < 4500) { return rub_prices['4000-4500']; } else
                                if (mmr < 5000) { return rub_prices['4500-5000']; } else
                                    if (mmr < 5500) { return rub_prices['5000-5500']; } else
                                        if (mmr < 6000) { return rub_prices['5500-6000']; } else
                                            if (mmr < 6500) { return rub_prices['6000-6500']; } else
                                                if (mmr < 7000) { return rub_prices['6500-7000']; } else
                                                    if (mmr <= 7500) { return rub_prices['7000+']; }
        } else {
            if (mmr < 2000) { return 0.02; } else
                if (mmr < 3000) { return 0.03; } else
                    if (mmr < 3500) { return 0.04; } else
                        if (mmr < 4000) { return 0.05; } else
                            if (mmr < 4500) { return 0.06; } else
                                if (mmr < 5000) { return 0.075; } else
                                    if (mmr < 5500) { return 0.12; } else
                                        if (mmr < 6000) { return 0.185; } else
                                            if (mmr < 6500) { return 0.32; } else
                                                if (mmr < 7000) { return 0.47; } else
                                                    if (mmr <= 7500) { return 0.97; }
        }
    }

}

export default BoostCalc