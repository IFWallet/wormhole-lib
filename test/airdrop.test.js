const HDPriv = require('../utils/hdpriv')
const {
  mnemonic, utxos, srcaddr,
} = require('./constants')
const airdropToken = require('../src/airdrop')

const hdpriv = new HDPriv()
hdpriv.recoverFromMnemonic(mnemonic)
const xprivkey = hdpriv.getNode().toBase58()
const tokenid = 1
const tokennum = 10
const dsttokenid = 2

console.log(airdropToken(xprivkey, srcaddr, utxos, tokenid, tokennum, dsttokenid))
