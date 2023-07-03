const provider = require("../provider")

test('check provider', ()=> {
    const url = "http://localhost:8545";
    const pvd = provider.getJsonRpcProvider(url);
    console.log(pvd);
})