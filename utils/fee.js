COIN_TYPES = {
  BCH: 'BCH',
}

COIN_UNIT_SCALING = {
  BCH: Math.pow(10, 8),
}

function getMaxFee(coin) {
  let fee = 10000
  let fees = {
      "BCH": 10000,
  }
  return fees[coin] || fee
}

function getMinFee(coin) {
  let fee = 500
  let fees = {
      "BCH": 500,
  }
  return fees[coin] || fee
}

function getMinRelayTxFee(coin) {
  let feeRate = 0.00001
  let feeRates = {
      "BCH": 0.00001,
  }
  return feeRates[coin] || feeRate
}

function getFee(coin, feeRate, txInputCount, txOutputCount) {
  const maxFee = getMaxFee(coin)
  const minFee = getMinFee(coin)
  let fee = minFee
  if (coin == COIN_TYPES.BTC || coin == COIN_TYPES.BCH) {
    const fee = feeRate * (180 * txInputCount + 34 * (txOutputCount + 1) + 10)
  }
  return Math.floor(Math.min(Math.max(Math.floor(fee), minFee), maxFee))
}

function getMinTxSize(coin, type) {
    let size = 182
    let sizes = {
        "P2PKH": 182,
        "SIGWIT": 98
    }
    return sizes[type] || size
}

function isDustOutput(
    coin, // coin type
    value, // output value
    type = 'P2PKH' // tx type
    ) {
    threshold = getMinOutputValue(coin, type)
    return value < threshold
}

function getMinOutputValue(coin, type='P2PKH') {
    let minTxSize = getMinTxSize(coin, type)
    let minRelayTxFee = getMinRelayTxFee(coin)
    let threshold = 3 * minTxSize * minRelayTxFee / 1000 * COIN_UNIT_SCALING[coin]
    return threshold
}

module.exports = {
  getMinFee,
  getMaxFee,
  getFee,
  getMinTxSize,
  getMinRelayTxFee,
  isDustOutput,
  getMinOutputValue
};
