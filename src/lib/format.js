function formatNumebr (x) {
  if (!x) return null;

  if (typeof x === 'number') return x;

  const parts = x.toString().split('.');
  const integer = parts[0].replace(/,/g, '');
  const value = integer.concat('.', parts[1]);
  const number = parseFloat(value);
  return number;
};

function formartFileSize (size) {
  const fileSizeUnit = ['B', 'K', 'M', 'G'];

  if (isNaN(size)) {
    throw new Error('size must be a number', 'formartFileSize');
  }

  let estimateSize = Number(size);
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
  formatNumebr,
  formartFileSize,
};

export default {
  formatNumebr,
  formartFileSize,
};
