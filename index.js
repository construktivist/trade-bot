const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
    keyId: process.env.APIKEY,
    secretKey: process.env.SECRETKEY,
    paper: true,
})


const init = async () => {

// GET ACCOUNT
alpaca.getAccount()
    .then((account) => {
        if (account.trading_blocked) {
            console.log('Account is currently restricted from trading.')
        }

        console.log(`Current buying power: $${account.buying_power}`)
        console.log(`Current portfolio value: $${account.portfolio_value}`)
        console.log(`Today's portfolio balance change: $${account.equity - account.last_equity}`)
    })

}

//GET ASSET
alpaca.getAsset('PLTR')
    .then((asset) => {
        if (asset.tradable) {
            console.log(`PLTR is tradable`)
        }
    })

// GET ASSETS 
// alpaca.getAssets({
//     status: 'active'
// }).then((activeAssets) => {
//     // Filter the assets down to just those on NASDAQ.
//     const nasdaqAssets = activeAssets.filter(asset => asset.exchange == 'NASDAQ')
//     nasdaqAssets.forEach( asset => {
//         console.log(asset.symbol)
//     });
// })

// GET CLOCK
alpaca.getClock()
    .then(clock => {
        clock.is_open ? console.log(`Market is open. It will close at ${clock.next_close}`) : console.log(`Market is closed. It will open at ${clock.next_open}`);
    })

// GET CALENDAR 
// alpaca.getCalendar({
//     start: '2021-03-28',
//     end: '2021-04-04'
// }).then( calendar => {
//         console.log(calendar)
//     })

//GET BARS
alpaca.getBars('day', 'PLTR', {
    limit: 5
}).then(barset => {
    const pltr_barset = barset['PLTR']
    console.log(pltr_barset[0].openPrice)
    console.log(pltr_barset.slice(-1)[0].closePrice)
    console.log((pltr_barset.slice(-1)[0].closePrice - pltr_barset[0].openPrice) /  pltr_barset[0].openPrice * 100)
})

const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca()

// Get daily price data for AAPL over the last 5 trading days.
const barset = alpaca.getBars(
    'day',
    'AAPL',
    {
        limit: 5
    }
).then((barset) => {
    const aapl_bars = barset['AAPL']

    // See how much AAPL moved in that timeframe.
    const week_open = aapl_bars[0].o
    const week_close = aapl_bars.slice(-1)[0].c
    const percent_change = (week_close - week_open) / week_open * 100

    console.log(`AAPL moved ${percent_change}% over the last 5 days`)
})

init();
