const sprintf = require('sprintf-js')
const whcomm = require('./common')
const coinfee = require('../utils/fee')

function newIssuanceManaged(xprivkey, srcaddr, utxos, tokenName,
  tokenPricision, tokenCategory, tokenSubcategory, tokenUrl, tokenDesc) {
  const ecosystem = whcomm.ecosystem.ECOSYSTEM_CONST
  const previousId = 0 // new token
  const hexEcosystem = sprintf.sprintf('%02s', ecosystem.toString(16))
  const hexPricision = sprintf.sprintf('%04s', tokenPricision.toString(16))
  const hexPreviousId = sprintf.sprintf('%08s', previousId.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0036${
    hexEcosystem
  }${hexPricision
  }${hexPreviousId
  }${whcomm.convProtocolStrToHexString(tokenCategory)
  }${whcomm.convProtocolStrToHexString(tokenSubcategory)
  }${whcomm.convProtocolStrToHexString(tokenName)
  }${whcomm.convProtocolStrToHexString(tokenUrl)
  }${whcomm.convProtocolStrToHexString(tokenDesc)}`

  // build tx
  const hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn, 'managed', 3)
  return hextx
}

function grant(xprivkey, srcaddr, utxos, tokenid, tokenNum, info) {
  const ecosystem = 1
  const hexTokenid = sprintf.sprintf('%016s', tokenid.toString(16))
  const hexEcosystem = sprintf.sprintf('%02s', ecosystem.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0037${
    hexEcosystem
  }${hexTokenid
  }${whcomm.convProtocolStrToHexString(info)}`

  // build tx
  const hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn)
  return hextx
}

function revoke(xprivkey, srcaddr, utxos, tokenid, tokenNum, info) {
  const hexTokenid = sprintf.sprintf('%02s', tokenid.toString(16))
  const hexTokenNum = sprintf.sprintf('%016s', tokenNum.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0038${
    hexTokenid
  }${hexTokenNum
  }${whcomm.convProtocolStrToHexString(info)}`

  // build tx
  const hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn)
  return hextx
}

function modifyTokenIssuser(xprivkey, srcIssuserWhcaddr, utxos, dstaddr, tokenid) {
  const hexTokenid = sprintf.sprintf('%08s', tokenid.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0038${
    hexTokenid}`

  const dstnum = coinfee.getMinOutputValue('BCH')
  return whcomm.newWHTx(xprivkey, srcIssuserWhcaddr, utxos, dstaddr, dstnum, opreturn)
}

module.exports = {
  newIssuanceManaged,
  grant,
  revoke,
  modifyTokenIssuser,
};
