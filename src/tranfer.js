const sprintf = require('sprintf-js')
const coinfee = require('../utils/fee')
const whcomm = require('./common')

// token 转账
function transferToken(xprivkey, srcaddr, utxos, tokenid, tokennum, dstaddr) {
  const hex_tokenid = sprintf.sprintf('%08s', tokenid.toString(16))
  const hex_tokennum = sprintf.sprintf('%016s', tokennum.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0000${
    hex_tokenid
  }${hex_tokennum}`

  console.log(opreturn)

  dstnum = coinfee.getMinOutputValue('BCH')
  return whcomm.newWHTx(xprivkey, srcaddr, utxos, dstaddr, dstnum, opreturn)
}


// 转移所有token
function transferAllToken(xprivkey, srcaddr, utxos, dstaddr, ecosystem) {
  const hex_ecosystem = sprintf.sprintf('%02s', ecosystem.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0004${
    hex_ecosystem}`

  console.log(opreturn)
  dstnum = coinfee.getMinOutputValue('BCH')
  return whcomm.newWHTx(xprivkey, srcaddr, utxos, dstaddr, dstnum, opreturn)
}

module.exports = {
  transferToken,
  transferAllToken
}