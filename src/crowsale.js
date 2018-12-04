const sprintf = require('sprintf-js')
const whcomm = require('./common')
const coinfee = require('../utils/fee')

function newIssuanceCrowsale(xprivkey, srcaddr, utxos,
  tokenName, tokenNum, tokenPricision, tokenCategory,
  tokenSubcategory, tokenUrl, tokenDesc,
  tokenid, nPerUnit, deadline,
  earlyBird) {
  const ecosystem = 1
  const previousId = 0
  const hexEcosystem = sprintf.sprintf('%02s', ecosystem.toString(16))
  const hexTokenPricision = sprintf.sprintf('%04s', tokenPricision.toString(16))
  const hexPreviousId = sprintf.sprintf('%08s', previousId.toString(16))
  const hexTokenid = sprintf.sprintf('%08s', tokenid.toString(16))
  const hexNPerUnit = sprintf.sprintf('%016s', nPerUnit.toString(16))
  const hexDeadline = sprintf.sprintf('%016s', deadline.toString(16))
  const hexEarlyBird = sprintf.sprintf('%02s', earlyBird.toString(16))
  const hexTokenNum = sprintf.sprintf('%016s', tokenNum.toString(16))


  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0033${
    hexEcosystem
  }${hexTokenPricision
  }${hexPreviousId
  }${whcomm.convProtocolStrToHexString(tokenCategory)
  }${whcomm.convProtocolStrToHexString(tokenSubcategory)
  }${whcomm.convProtocolStrToHexString(tokenName)
  }${whcomm.convProtocolStrToHexString(tokenUrl)
  }${whcomm.convProtocolStrToHexString(tokenDesc)
  }${hexTokenid
  }${hexNPerUnit
  }${hexDeadline
  }${hexEarlyBird
  }00${ // Undefined
    hexTokenNum}`

  // build tx
  const hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn, 'crowsale', feerate = 3)
  return hextx
}

function particrowsale(xprivkey, partiWhcaddr, utxos, issueAddr, tokenid, tokenNum) {
  const hexTokenid = sprintf.sprintf('%08s', tokenid.toString(16))
  const hexTokenNum = sprintf.sprintf('%016s', tokenNum.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0001${
    hexTokenid
  }${hexTokenNum}`

  // build tx
  const dstnum = coinfee.getMinOutputValue('BCH')
  const hextx = whcomm.newWHTx(xprivkey, partiWhcaddr, utxos, issueAddr, dstnum, opreturn)
  return hextx
}

function closeParticrowsale(xprivkey, srcaddr, utxos, dstaddr, tokenid) {
  const hexTokenid = sprintf.sprintf('%08s', tokenid.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0035${
    hexTokenid}`

  // build tx
  const hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn)
  return hextx
}

module.exports = {
  newIssuanceCrowsale,
  particrowsale,
  closeParticrowsale,
}
