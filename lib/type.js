const hasOwn = function _hasOwn (obj, key) {
  return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key);
};

const isNumber = function _isNumber(value) {
  return !isNaN(parseFloat(value));
};

const isString = function _isString (value) {
  return typeof value === 'string' || value instanceof String;
};

const isNativeStringType = function _isNativeStringType (type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
};

const isEmptyArray = function _isEmptyArray (value) {
  return Array.isArray(value) && !value.length;
};

const isEmpty = function _isEmpty (value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (isEmptyArray(value)) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  if (isEmptyObject(value)) {
    return true;
  }

  return false;
};

const isObject = function _isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object;
};

const isEmptyObject = function _isEmptyObject (obj) {
  return Object.keys(obj).length === 0;
};

// 判断数据类型
const _typeof = function (obj) {
  const class2type = {};
  'Boolean String Number Array Function Object Null Date RegExp Error'.split(' ').forEach((e, i) => {
    class2type[`[object ${e}]`] = e.toLowerCase();
  });
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[class2type.toString.call(obj)]
    : typeof obj;
};

export {
  hasOwn,
  isNumber,
  isString,
  isNativeStringType,
  _typeof,
  isEmptyArray,
  isEmptyObject,
  isEmpty
};

export default {
  hasOwn,
  isNumber,
  isString,
  isNativeStringType,
  _typeof,
  isEmptyArray,
  isEmptyObject,
  isEmpty
};
