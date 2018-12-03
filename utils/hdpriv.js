const bitcoin = require('bitcoinjs-lib')
const bip32 = require('bip32')
const bip39 = require('bip39')
const Option = require('./option')


class HDPriv {
  // m / purpose' / coin_type' / account' / is_change / address_index
  constructor() {
    this.mnemonic = null
    this.keypair = null
    this.wif = null
  }

  async gen(callback) {
    const generateMnemonic = async () => {
      try {
        return await bip39.generateMnemonic()
      } catch (e) {
        return false
      }
    }

    this.mnemonic = await generateMnemonic()
    const seedbuf = bip39.mnemonicToSeed(this.mnemonic)
    const node = bip32.fromSeed(seedbuf, Option.bitcoinNetwork)
    this.wif = node.toWIF()
    this.keypair = bitcoin.ECPair.fromWIF(this.wif, Option.bitcoinNetwork)
    if (callback) {
      callback()
    }
  }

  recoverFromMnemonic(mnemonic) {
    this.mnemonic = mnemonic
    const seedbuf = bip39.mnemonicToSeed(this.mnemonic)
    const node = bip32.fromSeed(seedbuf, Option.bitcoinNetwork)
    this.wif = node.toWIF()
    this.keypair = bitcoin.ECPair.fromWIF(this.wif, Option.bitcoinNetwork)
  }

  getNode() {
    const seedbuf = bip39.mnemonicToSeed(this.mnemonic)
    const node = bip32.fromSeed(seedbuf, Option.bitcoinNetwork)
    return node
  }

  getChildNode(path) {
    const seedbuff = bip39.mnemonicToSeed(this.mnemonic)
    const node = bip32.fromSeed(seedbuff, Option.bitcoinNetwork)
    const childnode = node.derivePath(path)
    return childnode
  }

  getHexChainCode() {
    const seedbuf = bip39.mnemonicToSeed(this.mnemonic)
    const node = bip32.fromSeed(seedbuf, Option.bitcoinNetwork)
    return node.chainCode.toString('hex');
  }
}

module.exports = HDPriv
