import * as requestProtocol from '../request-protocol.js';

(async()=>{
    const L1Rpc = requestProtocol.JsonRpc("http://localhost:8545")
    console.log(
        await L1Rpc("eth_blockNumber")
    )
})()
