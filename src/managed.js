const sprintf = require('sprintf-js')
const whcomm = require('./common')
const coinfee = require('../utils/fee')

// 创建可管理 token
function newIssuanceManaged(xprivkey, srcaddr, utxos, token_name,
    token_pricision, token_category, token_subcategory, token_url, token_desc) {

  let ecosystem = 1
  let previous_id = 0 // new token
  let hex_ecosystem = sprintf.sprintf('%02s', ecosystem.toString(16))
  let hex_pricision = sprintf.sprintf('%04s', token_pricision.toString(16))
  let hex_previous_id = sprintf.sprintf('%08s', previous_id.toString(16))

  let opreturn =
    whcomm.getWormHoleMagic() +
    whcomm.getWormHoleVersion() +
    '0036' +
    hex_ecosystem +
    hex_pricision +
    hex_previous_id +
    whcomm.convProtocolStrToHexString(token_category) +
    whcomm.convProtocolStrToHexString(token_subcategory) +
    whcomm.convProtocolStrToHexString(token_name) +
    whcomm.convProtocolStrToHexString(token_url) +
    whcomm.convProtocolStrToHexString(token_desc)

  console.log(opreturn)
  // build tx
  hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn, 'managed', feerate=3)
  return hextx
}

// 增发
function grant(xprivkey, srcaddr, utxos, tokenid, token_num, info) {

  let ecosystem = 1
  let hex_tokenid = sprintf.sprintf('%016s', tokenid.toString(16))
  let hex_token_num = sprintf.sprintf('%016s', token_num.toString(16))
  let hex_ecosystem = sprintf.sprintf('%02s', ecosystem.toString(16))

  let opreturn =
    whcomm.getWormHoleMagic() +
    whcomm.getWormHoleVersion() +
    '0037' +
    hex_ecosystem +
    hex_tokenid +
    whcomm.convProtocolStrToHexString(info)

  console.log(opreturn)
  // build tx
  hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn)
  return hextx
}

// 销毁
function revoke(xprivkey, srcaddr, utxos, tokenid, token_num, info) {
  let hex_tokenid = sprintf.sprintf('%02s', tokenid.toString(16))
  let hex_token_num = sprintf.sprintf('%016s', token_num.toString(16))

  let opreturn =
    whcomm.getWormHoleMagic() +
    whcomm.getWormHoleVersion() +
    '0038' +
    hex_tokenid +
    hex_token_num +
    whcomm.convProtocolStrToHexString(info)

  console.log(opreturn)
  // build tx
  hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn)
  return hextx
}

// 修改 token 的发行人
function modifyTokenIssuser(xprivkey, src_issuser_whcaddr, utxos, dstaddr, tokenid) {
  const hex_tokenid = sprintf.sprintf('%08s', tokenid.toString(16))

  const opreturn = `${whcomm.getWormHoleMagic()
    + whcomm.getWormHoleVersion()
  }0038${
    hex_tokenid}`

  console.log(opreturn)
  dstnum = coinfee.getMinOutputValue('BCH')
  return whcomm.newWHTx(xprivkey, src_issuser_whcaddr, utxos, dstaddr, dstnum, opreturn)
}

module.exports = {
  newIssuanceManaged,
  grant,
  revoke,
  modifyTokenIssuser
};
