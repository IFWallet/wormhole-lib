const bitcoin = require('bitcoinjs-lib')
const bip32 = require('bip32')
const bchaddr = require('bchaddrjs')
const sprintf = require('sprintf-js')
const coinselect = require('coinselect')
const coinfee = require('../common/fee')
const Option = require('../option')

const ecosystem = {
  ECOSYSTEM_CONST: 1,
}

const pricision = {
  PRICISION_: 0,
  PRICISION_0: 1,
  PRICISION_00: 2,
  PRICISION_000: 3,
  PRICISION_0000: 4,
  PRICISION_00000: 5,
  PRICISION_000000: 6,
  PRICISION_0000000: 7,
  PRICISION_00000000: 8,
}

function getWormHoleVersion() {
  return '0000'
}

function getWormHoleMagic() {
  return '08776863'
}

function convProtocolStrToHexString(str) {
  return `${Buffer.from(str).toString('hex')}00`
}

function newWHTx(xprivkey, srcaddr, utxos, dstaddr, dstnum, opreturn, mode, feerate=2) {
  const coin = 'BCH'

  let receivers = []
  if (dstaddr) {
    receivers.push({
      address: dstaddr,
      value: dstnum
    })

    if (coinfee.isDustOutput(coin, dstnum)) {
        console.error("dust output found")
        return null
    }
  }

  const {
    inputs,
    outputs,
    fee,
  } = coinselect(utxos, receivers, feerate)

  if (!inputs || !outputs) {
    return null
  }

  const txb = new bitcoin.TransactionBuilder(Option.bitcoinNetwork)
  txb.setVersion(2)
  txb.enableBitcoinCash(true)

  // srcaddr utxo first
  let ok = false
  inputs.forEach((input) => {
    if (input.address === srcaddr) {
      txb.addInput(input.txid, input.vout)
      ok = true
    }
  })

  if (!ok) {
    console.error('inputs must include srcaddr(coinselect error)')
    return null
  }

  inputs.forEach((input) => {
    if (input.address == srcaddr) return
    txb.addInput(input.txid, input.vout)
  })

  // op_return
  ret = bitcoin.script.compile(
    [
      bitcoin.opcodes.OP_RETURN,
      Buffer.from(opreturn, 'hex')
    ]
  )

  if (mode == 'whc') {
    if (dstaddr) {
      txb.addOutput(bchaddr.toLegacyAddress(dstaddr), dstnum) // wormhole addr
    }

    txb.addOutput(ret, 0) // payload
    outputs.forEach((output) => {
      if (output.address && output.address == dstaddr) return
      if (!output.address) {
        output.address = srcaddr
      }
      txb.addOutput(bchaddr.toLegacyAddress(output.address), output.value)
    })
  } else {
    outputs.forEach((output) => {
      if (dstaddr && output.address == dstaddr) return
      if (!output.address) {
        output.address = srcaddr
      }
      txb.addOutput(bchaddr.toLegacyAddress(output.address), output.value)
    })
    txb.addOutput(ret, 0) // payload
    if (dstaddr) {
      txb.addOutput(bchaddr.toLegacyAddress(dstaddr), dstnum) // last
    }
  }

  const node = bip32.fromBase58(xprivkey, Option.bitcoinNetwork)
  const hashType = bitcoin.Transaction.SIGHASH_ALL
    | bitcoin.Transaction.SIGHASH_BITCOINCASHBIP143

  // sign
  let idx = 0
  for (utxo of inputs) {
    const childNode = node.derivePath(utxo.path)
    const keypair = bitcoin.ECPair.fromWIF(childNode.toWIF(), Option.bitcoinNetwork)
    txb.sign(idx++, keypair, null, hashType, utxo.value)
  }

  const rawTx = txb.build().toHex()
  const tx = bitcoin.Transaction.fromHex(rawTx);
  const txid = tx.getId()
  return {txid, rawTx, fee, inputs, outputs}
}


module.exports = {
  getWormHoleVersion,
  getWormHoleMagic,
  convProtocolStrToHexString,
  newWHTx,
  ecosystem,
  pricision,
};
