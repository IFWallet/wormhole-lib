const {
  utxos, srcaddr, mnemonic, dstaddr,
} = require('./constants')
const HDPriv = require('../utils/hdpriv')
const managed = require('../src/managed')

const hdpriv = new HDPriv()
hdpriv.recoverFromMnemonic(mnemonic)
const xprivkey = hdpriv.getNode().toBase58()

const issueHextx = managed.newIssuanceManaged(xprivkey, srcaddr, utxos, 'IFT', 8, 'internet', 'internet of thing', 'https://www.ifwallet.com', 'IFWallet token')
const grantHextx = managed.grant(xprivkey, srcaddr, utxos, 193, 1000, 'grant')
const revokeHextx = managed.revoke(xprivkey, srcaddr, utxos, 193, 1000, 'revoke')
const modifyIssuserHextx = managed.modifyTokenIssuser(xprivkey, srcaddr, utxos, dstaddr, 193)

console.log('issueHextx', issueHextx)
console.log('grantHextx', grantHextx)
console.log('revokeHextx', revokeHextx)
console.log('modifyIssuserHextx', modifyIssuserHextx)