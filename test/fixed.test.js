const {
  utxos, srcaddr, mnemonic,
} = require('./constants')
const HDPriv = require('../utils/hdpriv')
const issuanceFixed = require('../src/fixed')

const hdpriv = new HDPriv()
hdpriv.recoverFromMnemonic(mnemonic)
const xprivkey = hdpriv.getNode().toBase58()

const hextx = issuanceFixed.newIssuanceFixed(xprivkey, srcaddr, utxos, 'IFT', 21000000 * (10 ** 8), 8, 'internet', 'internet of thing', 'https://www.ifwallet.com', 'IFWallet token')

console.log(hextx)
