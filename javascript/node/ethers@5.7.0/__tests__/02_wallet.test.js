const Wallet = require("../wallet")

test('check mnemonic', ()=> {
    console.log(Wallet.generateMnemonic())
})

test('try to get wallet from mnemonic', ()=> {
    const newMnemonicString = Wallet.generateMnemonic()
    const derivedWallet = Wallet.createWalletFromMnemonic(newMnemonicString, 0)
    const derivedMnemonicString = derivedWallet.mnemonic;
    console.log(newMnemonicString == derivedMnemonicString )
})