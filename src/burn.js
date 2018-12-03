const whcomm = require('./common')

function newBurnTx(xprivkey, srcaddr, utxos, whcaddr, burnnum) {
  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()}0044`
  return whcomm.newWHTx(xprivkey, srcaddr, utxos, whcaddr, burnnum, opreturn, 'whc')
}

module.exports = newBurnTx
