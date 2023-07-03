import {ethers} from '@local/ethers';

export const junkMnemonic = 'test test test test test test test test test test test junk';

export function getJsonRpcProvider(url) {
    return new ethers.providers.JsonRpcProvider(url)
}

export function generateMnemonic() {
    return ethers.Wallet.createRandom().mnemonic.phrase;
}

export function createWalletFromMnemonic(mnemonicString, index) {
    index = index ?? 0;
    const derivePathFromDefaultPath = `m/44'/60'/0'/0/${index}`;
    return ethers.Wallet.fromMnemonic(mnemonicString, derivePathFromDefaultPath);
}

export function createWalletFromPrivateKey(privateKey, provider) {
    if(provider === undefined) {
        return new ethers.Wallet(privateKey);
    }
    return new ethers.Wallet(privateKey, provider);
}
