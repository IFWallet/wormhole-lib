const HDPriv = require('../hdwallet/hdpriv')
const {
  newBurnTx,
  transToken,
  airdropToken,
  modifyTokenIssuser,
  transAllToken,
} = require('../src/whc')
const { ecosystem } = require('../wormhole/common')
// const issuance_fixed = require('../wormhole/issuance_fixed')
// const issuance_managed = require('../wormhole/issuance_managed')
// const particrowsale = require('../wormhole/particrowsale')

// wormhole address, 'bitcoincash:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqu08dsyxz98whc'
// wormhole address, 'bchtest:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqdmwgvnjkt8whc'
// whaddr = 'mrH1Qa86HGTiYpPmDkki4hvfEhXEjwYZaD'
whaddr = '1111111111111111115KMYP7R278'
mnemonic = ['card', 'yellow', 'elephant', 'rubber', 'beach', 'comfort', 'act', 'deposit', 'sight', 'age', 'predict', 'sun']
utxos = [{
  txid: '099e0967b5ae3df75d523f16a3d6f0c9a3c8328f2051c693a3279ec8de2f89f6',
  vout: 0,
  address: '1DH47HAieAYDwbr4PqmHik2Z52WeTuWVyu',
  value: 153989000,
  script: '76a91486aac26a4458e3ff2c4b15fb22d34eb62ebc5dc388ac',
  path: "m/44'/145'/0'/0/0",
}]
srcaddr = '1DH47HAieAYDwbr4PqmHik2Z52WeTuWVyu'
dstaddr = '1HRSMsu4uXnsz2F2zSyFGT6yv1k2xCQw6j'

function test_airdrop_token() {
  hdpriv = new HDPriv()
  hdpriv.recoverFromMnemonic(mnemonic.join(' '))
  xprivkey = hdpriv.getNode().toBase58()
  tokenid = 1
  tokennum = 10
  dsttokenid = 2

  console.log(airdropToken(xprivkey, srcaddr, utxos, tokenid, tokennum, dsttokenid))
}

test_burn()
// test_trans_token()
// test_airdrop_token()

// hextx = modifyTokenIssuser(burnaddr, utxo, test_user, test_user_accept_token.getAddress(), 1)
// hextx = transAllToken(burnaddr, utxo, test_user, test_user_accept_token.getAddress(), ecosystem.ECOSYSTEM_CONST)

// hextx = issuance_fixed.newIssuanceFixed(burnaddr, utxo, test_user, ecosystem.ECOSYSTEM_CONST, pricision.PRICISION_, 1, 'dylan', 'dylan', 'dylan_token', 'dylan_token_url', 'dylan_token_desc', 1000000)

// hextx = issuance_managed.newIssuanceManaged(burnaddr, utxo, test_user, ecosystem.ECOSYSTEM_CONST, pricision.PRICISION_, 0, 'dylan', 'dylan', 'dylan_token', 'dylan_token_url', 'dylan_token_desc')
// hextx = issuance_managed.grant(burnaddr, utxo, test_user, ecosystem.ECOSYSTEM_CONST, 3, 1000000, 'dylan_grant')
// hextx = issuance_managed.revoke(burnaddr, utxo, test_user, 3, 1000000, 'dylan_revoke')

// hextx = particrowsale.newParticrowsale(burnaddr, utxo, test_user, ecosystem.ECOSYSTEM_CONST, pricision.PRICISION_, 2, 'dylan', 'dylan', 'dylan_token', 'dylan_token_url', 'dylan_token_desc', 3, 1000, 150000000, 9, 100000000)
// // BCH = xxx token ???
// hextx = particrowsale.particrowsale(burnaddr, utxo, test_user, test_user_accept_token.getAddress(), 3, 1000)
// hextx = particrowsale.closeParticrowsale(burnaddr, utxo, test_user, test_user_accept_token.getAddress(), 3)
//
