const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
    keyId: process.env.APIKEY,
    secretKey: process.env.SECRETKEY,
    paper: true,
})


const init = async () => {

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

alpaca.getAsset('PLTR')
    .then((asset) => {
        if (asset.tradable) {
            console.log(`PLTR is tradable`)
        }
    })

    const activeAssets = alpaca.getAssets({
        status: 'active'
    }).then((activeAssets) => {
        // Filter the assets down to just those on NASDAQ.
        const nasdaqAssets = activeAssets.filter(asset => asset.exchange == 'NASDAQ')
        nasdaqAssets.forEach( asset => {
            console.log(asset.symbol)
        });
    })

init();
