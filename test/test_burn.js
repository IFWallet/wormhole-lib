

function test_burn() {
  hdpriv = new HDPriv()
  hdpriv.recoverFromMnemonic(mnemonic.join(' '))
  xprivkey = hdpriv.getNode().toBase58()
  burnnum = 100000000
  console.log(newBurnTx(xprivkey, srcaddr, utxos, whaddr, burnnum))
}