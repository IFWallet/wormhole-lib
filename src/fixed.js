const sprintf = require('sprintf-js')
const whcomm = require('./common')

// 新建固定 token
function newIssuanceFixed(xprivkey, srcaddr, utxos, tokenName,
  tokenNum, tokenPricision, tokenCategory, tokenSubcategory, tokenUrl, tokenDesc) {
  const ecosystem = whcomm.ecosystem.ECOSYSTEM_CONST
  const previousId = 0
  const hexEcosystem = sprintf.sprintf('%02s', ecosystem.toString(16))
  const hexPricision = sprintf.sprintf('%04s', tokenPricision.toString(16))
  const hexPreviousId = sprintf.sprintf('%08s', previousId.toString(16))
  const hexTokenNum = sprintf.sprintf('%016s', tokenNum.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0032${
    hexEcosystem
  }${hexPricision
  }${hexPreviousId
  }${whcomm.convProtocolStrToHexString(tokenCategory)
  }${whcomm.convProtocolStrToHexString(tokenSubcategory)
  }${whcomm.convProtocolStrToHexString(tokenName)
  }${whcomm.convProtocolStrToHexString(tokenUrl)
  }${whcomm.convProtocolStrToHexString(tokenDesc)
  }${hexTokenNum}`

  // build tx
  const hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn, 'fixed', feerate = 3)
  return hextx
}

module.exports = {
  newIssuanceFixed,
};
