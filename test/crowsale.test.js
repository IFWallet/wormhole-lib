const {
  utxos, srcaddr, mnemonic, dstaddr,
} = require('./constants')
const HDPriv = require('../utils/hdpriv')
const crowsale = require('../src/crowsale')

const hdpriv = new HDPriv()
hdpriv.recoverFromMnemonic(mnemonic)
const xprivkey = hdpriv.getNode().toBase58()

const issueHextx = crowsale.newIssuanceCrowsale(xprivkey, srcaddr, utxos, 'IFT', 21000000 * (10 ** 8), 8, 'internet', 'internet of thing', 'https://www.ifwallet.com', 'IFWallet token', 10, 100, 150000000, 10)
const partiHextx = crowsale.particrowsale(xprivkey, srcaddr, utxos, dstaddr, 193, 1000)
const closeHextx = crowsale.closeParticrowsale(xprivkey, srcaddr, utxos, dstaddr, 193, 1000)

console.log('issueHextx', issueHextx)
console.log('grantHextx', partiHextx)
console.log('revokeHextx', closeHextx)