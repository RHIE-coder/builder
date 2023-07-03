import * as utils from './utils.js';
import * as OpContracts from '@eth-optimism/contracts';
import * as OpSDK from '@eth-optimism/sdk';
import * as optimismSDK from '@eth-optimism/sdk';
import { JsonRpc } from '../../__common__/request-protocol.js'



const L1_URL = 'http://localhost:8545'
const L2_URL = 'http://localhost:9545'
const NODE_URL = 'http://localhost:7545'


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


    const crossChainMessenger = new OpSDK.CrossChainMessenger({
        l1ChainId,
        l2ChainId,
        l1SignerOrProvider: L1Wallet,
        l2SignerOrProvider: L2Wallet,
    })

    const gwei = 1000000000n
    const eth = gwei * gwei   // 10^18
    const centieth = eth / 100n

    const reportBalances = async () => {
        const l1Balance = (await crossChainMessenger.l1Signer.getBalance()).toString().slice(0, -9)
        const l2Balance = (await crossChainMessenger.l2Signer.getBalance()).toString().slice(0, -9)

        console.log(`On L1:${l1Balance} Gwei\nOn L2:${l2Balance} Gwei`)
    }    // reportBalances

    const depositETH = async () => {
        console.log("Deposit ETH");
        await reportBalances()

        const start = new Date()
        const response = await crossChainMessenger.depositETH(gwei);
        console.log(`Transaction Hash (on L1) : ${response.hash}`)
        await response.wait()
        console.log("Waiting for status to change to RELAYED")
        console.log(`Time so far ${(new Date() - start) / 1000} seconds`)
        await crossChainMessenger.waitForMessageStatus(response.hash,
            optimismSDK.MessageStatus.RELAYED)
        await reportBalances()
        console.log(`depositETH took ${(new Date() - start) / 1000} seconds\n\n`)
    }     // depositETH()

    const withdrawETH = async () => {
        console.log("Withdraw ETH");

        const start = new Date();
        await reportBalances();
        const response = await crossChainMessenger.withdrawETH(centieth);
        console.log(`Transaction hash (on L2): ${response.hash}`)
        console.log(`\tFor more information: https://goerli-optimism.etherscan.io/tx/${response.hash}`)
        await response.wait()
        console.log("Waiting for status to be READY_TO_PROVE")
        console.log(`Time so far ${(new Date() - start) / 1000} seconds`)
        await crossChainMessenger.waitForMessageStatus(response.hash,
            optimismSDK.MessageStatus.READY_TO_PROVE)

        console.log(`Time so far ${(new Date() - start) / 1000} seconds`)
        await crossChainMessenger.proveMessage(response.hash)

        console.log("In the challenge period, waiting for status READY_FOR_RELAY")
        console.log(`Time so far ${(new Date() - start) / 1000} seconds`)
        await crossChainMessenger.waitForMessageStatus(response.hash,
            optimismSDK.MessageStatus.READY_FOR_RELAY)

        console.log("Ready for relay, finalizing message now")
        console.log(`Time so far ${(new Date() - start) / 1000} seconds`)
        await crossChainMessenger.finalizeMessage(response.hash)
        console.log("Waiting for status to change to RELAYED")
        console.log(`Time so far ${(new Date() - start) / 1000} seconds`)
        await crossChainMessenger.waitForMessageStatus(response,
            optimismSDK.MessageStatus.RELAYED)
        await reportBalances()
        console.log(`withdrawETH took ${(new Date() - start) / 1000} seconds\n\n\n`)
    }     // withdrawETH()

    // await reportBalances()
    await depositETH()
    // await withdrawETH()

    // console.log(OpContracts)
    // console.log(
    //     await L1Rpc("eth_getBalance", [wallet.address, "latest"])
    // )
    // console.log(
    //     await NodeRpc("optimism_outputAtBlock", ["0x1"]),
    // )
}