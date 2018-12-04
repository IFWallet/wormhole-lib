const sprintf = require('sprintf-js')
const whcomm = require('./common')

// 空投 token
function airdropToken(xprivkey, srcaddr, utxos, airdropTokenid, tokennum, dstTokenid) {
  const hexAirdropTokenid = sprintf.sprintf('%08s', airdropTokenid.toString(16))
  const hexTokennum = sprintf.sprintf('%016s', tokennum.toString(16))
  const hexDstTokenid = sprintf.sprintf('%08s', dstTokenid.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0003${
    hexAirdropTokenid
  }${hexTokennum
  }${hexDstTokenid}`

  return whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn)
}

module.exports = airdropToken