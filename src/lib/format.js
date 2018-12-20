const numFormatter = function _numFormatter (x) {
  if (!x) return null

  if (typeof x === 'number') return x

  const parts = x.toString().split('.')
  const integer = parts[0].replace(/,/g, '')
  const value = integer.concat('.', parts[1])
  const number = parseFloat(value)
  return number
}

const numberDecimals = function _numberDecimals (num, decimals) {
  const result = Number(String(num).match(/^\d+(?:\.\d{0,2})?/)[0])
  return result
}

const fileSizeUnit = ['B', 'K', 'M', 'G']
const formartFileSize = function (size) {
  if (isNaN(size)) {
    throw new Error('size must be a number', 'formartFileSize')
  }

  let tmp = Number(size)
  let i = 0
  let unit = ''

  if (!tmp) return '0B'

  while (i < 4) {
    if (Math.pow(1024, i) <= tmp && tmp < Math.pow(1024, i + 1)) {
      tmp = parseFloat(tmp / Math.pow(1024, i)).toFixed(1)
      unit = fileSizeUnit[i]
      break
    }
    i += 1
  }

  return `${tmp}${unit}`
}

export {
  numFormatter,
  formartFileSize,
  numberDecimals
}
