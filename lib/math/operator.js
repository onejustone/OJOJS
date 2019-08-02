// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
function flattenDeep(arr1) {
  return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

function sum() {
  const flatArgumentsArr = flattenDeep(Array.from(arguments));
  return flatArgumentsArr.reduce((x, y) => +(+x + +y).toFixed(2));
}

function multiply() {
  const flatArgumentsArr = flattenDeep(Array.from(arguments));
  return flatArgumentsArr.reduce((x, y) => +(+x * +y).toFixed(2));
}

export {
  sum,
  multiply
};

export default {
  sum,
  multiply
};
