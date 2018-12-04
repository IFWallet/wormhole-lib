const HDPriv = require('../utils/hdpriv')
const {
  mnemonic, utxos, srcaddr, whaddr,
} = require('./constants')
const newBurnTx = require('../src/burn')

const hdpriv = new HDPriv()
hdpriv.recoverFromMnemonic(mnemonic)
const xprivkey = hdpriv.getNode().toBase58()
const burnnum = 100000000

console.log(newBurnTx(xprivkey, srcaddr, utxos, whaddr, burnnum))
