const { ethers } = require("@local/ethers")
const optimismSDK = require("@eth-optimism/sdk")

const junkMnemonic = 'test test test test test test test test test test test junk';
const mnemonic = junkMnemonic

const words = junkMnemonic.match(/[a-zA-Z]+/g).length
validLength = [12, 15, 18, 24]
if (!validLength.includes(words)) {
    console.log(`The mnemonic (${junkMnemonic}) is the wrong number of words`)
    process.exit(-1)
}

// const l1Url = `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_ALCHEMY_KEY}`
// const l2Url = `https://opt-goerli.g.alchemy.com/v2/${process.env.OP_GOERLI_ALCHEMY_KEY}`
const l1Url = 'http://127.0.0.1:8545'
const l2Url = 'http://127.0.0.1:9545'

// Global variable because we need them almost everywhere
let crossChainMessenger
let addr    // Our address

const getSigners = async () => {
    const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1Url)
    const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2Url)
    console.log(await l1RpcProvider.getNetwork())
    console.log(await l2RpcProvider.getNetwork())
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
    const privateKey = hdNode.derivePath(ethers.utils.defaultPath).privateKey
    const l1Wallet = new ethers.Wallet(privateKey, l1RpcProvider)
    const l2Wallet = new ethers.Wallet(privateKey, l2RpcProvider)
    return [l1Wallet, l2Wallet]
}   // getSigners


const setup = async () => {
    const [l1Signer, l2Signer] = await getSigners()
    addr = l1Signer.address
    console.log(addr)
    const l1ChainId = (await l1Signer.provider.getNetwork()).chainId
    const l2ChainId = (await l2Signer.provider.getNetwork()).chainId
    console.log(l1ChainId)
    console.log(l2ChainId)
    
    crossChainMessenger = new optimismSDK.CrossChainMessenger({
        l1ChainId,
        l2ChainId,
        l1SignerOrProvider: l1Signer,
        l2SignerOrProvider: l2Signer,
    })
}    // setup



const gwei = BigInt(1e9)
const eth = gwei * gwei   // 10^18
const centieth = eth / 100n


const reportBalances = async () => {
    const l1Balance = (await crossChainMessenger.l1Signer.getBalance()).toString().slice(0, -9)
    const l2Balance = (await crossChainMessenger.l2Signer.getBalance()).toString().slice(0, -9)

    console.log(`On L1:${l1Balance} Gwei    On L2:${l2Balance} Gwei`)
}    // reportBalances


const depositETH = async () => {

    console.log("Deposit ETH")
    await reportBalances()
    const start = new Date()

    console.log(optimismSDK.CONTRACT_ADDRESSES)
    const response = await crossChainMessenger.depositETH(1000n * gwei)
    console.log(`Transaction hash (on L1): ${response.hash}`)
    await response.wait()
    console.log("Waiting for status to change to RELAYED")
    console.log(`Time so far ${(new Date() - start) / 1000} seconds`)
    await crossChainMessenger.waitForMessageStatus(response.hash,
        optimismSDK.MessageStatus.RELAYED)

    await reportBalances()
    console.log(`depositETH took ${(new Date() - start) / 1000} seconds\n\n`)
}     // depositETH()





const withdrawETH = async () => {

    console.log("Withdraw ETH")
    const start = new Date()
    await reportBalances()

    const response = await crossChainMessenger.withdrawETH(centieth)
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


const main = async () => {
    await setup()
    await depositETH()
    await withdrawETH()
    // await depositERC20()
    // await withdrawERC20()
}  // main



main().then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })