const bitcoin = require('bitcoinjs-lib')

class Option {
  static enableBitcoinMainnet () {
    Option.bitcoinNetwork = bitcoin.networks.bitcoin
  }

  static enableBitcoinTestnet () {
    Option.bitcoinNetwork = bitcoin.networks.testnet
  }
}

Option.bitcoinNetwork = bitcoin.networks.bitcoin

module.exports = Option