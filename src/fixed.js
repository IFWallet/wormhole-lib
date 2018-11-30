const sprintf = require('sprintf-js')
const whcomm = require('./common')

// 新建固定 token
function newIssuanceFixed(xprivkey, srcaddr, utxos, token_name,
    token_num, token_pricision, token_category, token_subcategory, token_url, token_desc) {

  let ecosystem = 1
  let previous_id = 0  // new token
  let hex_ecosystem =
    sprintf.sprintf('%02s', ecosystem.toString(16))
  let hex_pricision = sprintf.sprintf('%04s', token_pricision.toString(16))
  let hex_previous_id = sprintf.sprintf('%08s', previous_id.toString(16))
  let hex_token_num = sprintf.sprintf('%016s', token_num.toString(16))

  let opreturn =
    whcomm.getWormHoleMagic() +
    whcomm.getWormHoleVersion() +
    '0032' +
    hex_ecosystem +
    hex_pricision +
    hex_previous_id +
    whcomm.convProtocolStrToHexString(token_category) +
    whcomm.convProtocolStrToHexString(token_subcategory) +
    whcomm.convProtocolStrToHexString(token_name) +
    whcomm.convProtocolStrToHexString(token_url) +
    whcomm.convProtocolStrToHexString(token_desc) +
    hex_token_num

  console.log(opreturn)
  // build tx
  hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn, 'fixed', feerate=3)
  return hextx
}

module.exports = {
  newIssuanceFixed,
};
