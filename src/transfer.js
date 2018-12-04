const sprintf = require('sprintf-js')
const coinfee = require('../utils/fee')
const whcomm = require('./common')

// token 转账
function transferToken(xprivkey, srcaddr, utxos, tokenid, tokennum, dstaddr) {
  const hexTokenid = sprintf.sprintf('%08s', tokenid.toString(16))
  const hexTokennum = sprintf.sprintf('%016s', tokennum.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0000${
    hexTokenid
  }${hexTokennum}`

  const dstnum = coinfee.getMinOutputValue('BCH')
  return whcomm.newWHTx(xprivkey, srcaddr, utxos, dstaddr, dstnum, opreturn)
}


// 转移所有token
function transferAllToken(xprivkey, srcaddr, utxos, dstaddr) {
  const hexEcosystem = sprintf.sprintf('%02s', whcomm.ecosystem.ECOSYSTEM_CONST.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0004${
    hexEcosystem}`

  const dstnum = coinfee.getMinOutputValue('BCH')
  return whcomm.newWHTx(xprivkey, srcaddr, utxos, dstaddr, dstnum, opreturn)
}

module.exports = {
  transferToken,
  transferAllToken,
}
