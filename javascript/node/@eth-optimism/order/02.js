import * as utils from './utils.js';
import * as OpContracts from '@eth-optimism/contracts';
import * as OpSDK from '@eth-optimism/sdk';
import * as optimismSDK from '@eth-optimism/sdk';
import { JsonRpc } from '../../__common__/request-protocol.js'
import { ethers } from "@local/ethers";


const L1_URL = 'http://localhost:8545'
const L2_URL = 'http://localhost:9545'
const NODE_URL = 'http://localhost:7545'


function hexToString(data, hasResult, isNumber, hookFunc) {

    let target;

    if(hasResult) {
        target = data.result;
    } else {
        target = data;
    }

    const converted = BigInt(target);

    if(isNumber) {
        hookFunc(Number(converted))
        return Number(converted);
    }

    hookFunc(converted.toString())
    return converted.toString();
}

async function sign(wallet, data) {
        /*  
            # data object includes
                - from
                - to
                - gas
                - gasPrice
                - data
                - nonce
        */

        // const tx = new ethers.Transaction();
        
        // tx.chainId = 900;

        // tx.type = 2;
        // tx.to = data.to;
        // tx.from = data.from;
        // tx.gasLimit = BigInt(data.gas);
        // tx.gasPrice = BigInt(data.gasPrice);
        // tx.nonce = BigInt(data.nonce);
        // tx.maxFeePerGas = data.maxFeePerGas;
        // tx.maxPriorityFeePerGas = data.maxPriorityFeePerGas;


        // if(data.value) {
        //     tx.value = BigInt(data.value);
        // }

        // if(data.data) {
        //     tx.data = data.data;
        // }

        const tx = {
            type: 2,
            chainId: 900,
            ...data,
       } 
       console.log(tx)
        return await wallet.signTransaction(tx);
}

export default async function exec() {
    const L1Rpc = JsonRpc(L1_URL)
    const L2Rpc = JsonRpc(L2_URL)
    const NodeRpc = JsonRpc(NODE_URL)
    const wallet = utils.createWalletFromMnemonic(utils.junkMnemonic);
    const L1Provider = utils.getJsonRpcProvider(L1_URL)
    const L2Provider = utils.getJsonRpcProvider(L2_URL)
    const L1Wallet = utils.createWalletFromPrivateKey(wallet.privateKey, L1Provider)
    const L2Wallet = utils.createWalletFromPrivateKey(wallet.privateKey, L2Provider)

    const l1ChainId = Number(BigInt((await L1Rpc("eth_chainId")).result))
    const l2ChainId = Number(BigInt((await L2Rpc("eth_chainId")).result))
    console.log(l1ChainId)
    console.log(l2ChainId)



    console.log(
        await L1Wallet.getTransactionCount()
    )
    // hexToString( await L1Wallet.getFeeData(), true, null, console.log)

    console.log(
        await L1Rpc("eth_getBalance", [L1Wallet.address, "latest"])
    )

    console.log(
        await L1Rpc("eth_getBalance", ["0x0000000000000000000000000000000000000000","latest"])
    )

    console.log(
        await L2Rpc("eth_getBalance", ["0x0000000000000000000000000000000000000000","latest"])
    )


    console.log(
        await L1Wallet.getFeeData()
    )
    
    const feeInfo = await L1Wallet.getFeeData()
    const maxFeePerGas = BigInt(feeInfo.maxFeePerGas)
    const maxPriorityFeePerGas = BigInt(feeInfo.maxPriorityFeePerGas)
    const gasPrice = BigInt(feeInfo.gasPrice)
    console.log(maxFeePerGas)
    console.log(maxPriorityFeePerGas)
    console.log(gasPrice)

    const gasLimit = BigInt(
            await L1Wallet.estimateGas({
                to: "0x0000000000000000000000000000000000000000",
                value : ethers.utils.parseEther("100"),
            })
        )

    

    const tx = {
        type:2,
        chainId: 900,
        to: "0x0000000000000000000000000000000000000000",
        value: BigInt(ethers.utils.parseEther("100")),
        nonce: BigInt(await L1Wallet.getTransactionCount()),
        gasLimit: gasLimit,
        gasPrice: maxFeePerGas,
        maxFeePerGas: maxFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas,
    }

    console.log(tx)

    // const signedTTX = await sign(L1Wallet, tx)
    const signedTransaction = await L1Wallet.signTransaction(tx);
    const decodedTransaction = ethers.utils.parseTransaction(signedTransaction);
    console.log(decodedTransaction)
    // console.log(signedTTX.slice(2))
    console.log(await L1Wallet.sendTransaction(signedTransaction))
}