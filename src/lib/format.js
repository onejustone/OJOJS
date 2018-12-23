import {
  isNumber
} from './type';

function formatToNumebr (x) {
  if (!x) return null;

  if (typeof x === 'number') return x;

  const parts = x.toString().split('.');
  const integer = parts[0].replace(/,/g, '');
  const value = integer.concat('.', parts[1]);
  const number = parseFloat(value);
  return number;
};

function prettyNumberToMoney ({
  prefix = '¥',
  number = null,
  decimals = 2,
  decimal = '.',
  separator = ',',
  suffix = '',
} = {}) {
  let num = formatToNumebr(number);
  num = num.toFixed(decimals);
  num += '';

  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : '';

  const rgx = /(\d+)(\d{3})/;

  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2');
    }
  }

  return prefix + x1 + x2 + suffix;
}

function formartFileSize (byteSize) {
  const fileSizeUnit = ['B', 'K', 'M', 'G'];

  if (isNaN(byteSize)) {
    throw new Error('size must be a number', 'formartFileSize');
  }

  let estimateSize = Number(byteSize);
  let i = 0;
  let unit = '';

  if (!estimateSize) return '0B';

  while (i < 4) {
    if (Math.pow(1024, i) <= estimateSize && estimateSize < Math.pow(1024, i + 1)) {
      estimateSize = parseFloat(estimateSize / Math.pow(1024, i)).toFixed(1);
      unit = fileSizeUnit[i];
      break;
    }
    i += 1;
  }

  return `${estimateSize}${unit}`;
};

export {
  prettyNumberToMoney,
  formatToNumebr,
  formartFileSize,
};

export default {
  prettyNumberToMoney,
  formatToNumebr,
  formartFileSize,
};
