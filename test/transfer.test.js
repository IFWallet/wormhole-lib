const HDPriv = require('../utils/hdpriv')
const {
  mnemonic, utxos, srcaddr, dstaddr,
} = require('./constants')
const { transferToken, transferAllToken } = require('../src/transfer')

const hdpriv = new HDPriv()
hdpriv.recoverFromMnemonic(mnemonic)
const xprivkey = hdpriv.getNode().toBase58()
const tokenid = 1
const tokennum = 10

console.log(transferToken(xprivkey, srcaddr, utxos, tokenid, tokennum, dstaddr))
console.log(transferAllToken(xprivkey, srcaddr, utxos, dstaddr))