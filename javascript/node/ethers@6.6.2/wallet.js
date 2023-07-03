const ethers = require('ethers');

module.exports.generateMnemonic = () => {
    return ethers.Wallet.createRandom().mnemonic.phrase;
}

module.exports.createWalletFromMnemonic = (mnemonicString, index) => {
    index = index ?? 0;
    const childPath = `m/44'/60'/0'/0/${index}`;
    const wallet = ethers.Wallet.fromPhrase(mnemonicString);
    return ethers.HDNodeWallet.fromMnemonic(wallet.mnemonic, childPath);
}

module.exports.createWalletFromPrivateKey = (privateKey) => {
    return new ethers.Wallet(privateKey);
}

module.exports.sign = async (wallet, data) => {
        /*  
            # data object includes
                - from
                - to
                - gas
                - gasPrice
                - data
                - nonce
        */

        const tx = new ethers.Transaction();
        
        tx.chainId = 256;

        tx.type = 0;
        tx.to = data.to;
        tx.from = data.from;
        tx.gasLimit = BigInt(data.gas);
        tx.gasPrice = BigInt(data.gasPrice);
        tx.nonce = BigInt(data.nonce);


        if(data.value) {
            tx.value = BigInt(data.value);
        }

        if(data.data) {
            tx.data = data.data;
        }

        return await wallet.signTransaction(tx);
}