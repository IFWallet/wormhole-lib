const sprintf = require('sprintf-js')
const whcomm = require('./common')
const coinfee = require('../utils/fee')

// 新建众筹
function newIssuanceCrowsale(xprivkey, srcaddr, utxos,
  token_name, token_num, token_pricision, token_category,
  token_subcategory, token_url, token_desc,
  tokenid, n_per_unit, deadline,
  early_bird) {

  let ecosystem = 1
  let previous_id = 0
  let hex_ecosystem = sprintf.sprintf('%02s', ecosystem.toString(16))
  let hex_token_pricision = sprintf.sprintf('%04s', token_pricision.toString(16))
  let hex_previous_id = sprintf.sprintf('%08s', previous_id.toString(16))
  let hex_tokenid = sprintf.sprintf('%08s', tokenid.toString(16))
  let hex_n_per_unit = sprintf.sprintf('%016s', n_per_unit.toString(16))
  let hex_deadline = sprintf.sprintf('%016s', deadline.toString(16))
  let hex_early_bird = sprintf.sprintf('%02s', early_bird.toString(16))
  let hex_token_num = sprintf.sprintf('%016s', token_num.toString(16))


  let opreturn =
    whcomm.getWormHoleMagic() +
    whcomm.getWormHoleVersion() +
    '0033' +
    hex_ecosystem +
    hex_token_pricision +
    hex_previous_id +
    whcomm.convProtocolStrToHexString(token_category) +
    whcomm.convProtocolStrToHexString(token_subcategory) +
    whcomm.convProtocolStrToHexString(token_name) +
    whcomm.convProtocolStrToHexString(token_url) +
    whcomm.convProtocolStrToHexString(token_desc) +
    hex_tokenid +
    hex_n_per_unit +
    hex_deadline +
    hex_early_bird +
    '00' + // Undefined
    hex_token_num

  console.log(opreturn)
  // build tx
  hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn, 'crowsale', feerate=3)
  return hextx
}

// 参与众筹
function particrowsale(xprivkey, parti_whcaddr, utxos, issue_addr, tokenid, token_num) {
  let hex_tokenid = sprintf.sprintf('%08s', tokenid.toString(16))
  let hex_token_num = sprintf.sprintf('%016s', token_num.toString(16))

  let opreturn =
    whcomm.getWormHoleMagic() +
    whcomm.getWormHoleVersion() +
    '0001' +
    hex_tokenid +
    hex_token_num

  console.log(opreturn)
  // build tx
  dstnum = coinfee.getMinOutputValue('BCH')
  hextx = whcomm.newWHTx(xprivkey, parti_whcaddr, utxos, issue_addr, dstnum, opreturn)
  return hextx
}

// 关闭众筹
function closeParticrowsale(xprivkey, srcaddr, utxos, dstaddr, tokenid) {
  let hex_tokenid = sprintf.sprintf('%08s', tokenid.toString(16))

  let opreturn =
    whcomm.getWormHoleMagic() +
    whcomm.getWormHoleVersion() +
    '0035' +
    hex_tokenid

  console.log(opreturn)
  // build tx
  hextx = whcomm.newWHTx(xprivkey, srcaddr, utxos, null, 0, opreturn)
  return hextx
}

module.exports = {
  newIssuanceCrowsale,
  particrowsale,
  closeParticrowsale,
};
