const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
    keyId: process.env.APIKEY,
    secretKey: process.env.SECRETKEY,
    paper: true,
})


const init = async () => {

console.log(alpaca);

}

init();
