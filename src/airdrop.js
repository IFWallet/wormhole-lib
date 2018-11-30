const sprintf = require('sprintf-js')
const whcomm = require('./common')

// 空投 token
function airdropToken(xprivkey, srcaddr, utxos, airdrop_tokenid, tokennum, dst_tokenid) {
  const hex_airdrop_tokenid = sprintf.sprintf('%08s', airdrop_tokenid.toString(16))
  const hex_tokennum = sprintf.sprintf('%016s', tokennum.toString(16))
  const hex_dst_tokenid = sprintf.sprintf('%08s', dst_tokenid.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0003${
    hex_airdrop_tokenid
  }${hex_tokennum
  }${hex_dst_tokenid}`

  console.log(opreturn)
  return whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn)
}


module.exports = airdropToken