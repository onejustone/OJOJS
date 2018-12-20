const hasOwn = function _hasOwn (obj, key) {
  return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key);
};

const isEmptyItem = function _isEmptyItem (values) {
  return values.every(child => isEmptyArray(child.value) || isEmptyValue(child.value));
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

const isEmptyValue = function _isEmptyValue (value, type) {
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

const deepCloneObj = function _deepCloneObj (source) {
  if (!source) {
    return [];
  }

  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }

  const targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};l
        targetObj[keys] = _deepCloneObj(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
};

const each = function _each (obj, callback) {
  let i, len;
  if (Array.isArray(obj)) {
    for (i = 0, len = obj.length; i < len; i++) {
      if (callback(obj[i], i, obj) === false) {
        break;
      }
    }
  } else if (isObject(obj)) {
    const keysArr = Object.keys(obj);
    for (const key of keysArr) {
      if (callback(obj[key], key, obj) === false) {
        break;
      }
    }
  }
  return obj;
};

const unique = function (items, key) {
  const tmpArr = [];
  const tmpSet = new Set();

  items.forEach(item => {
    if (!tmpSet.has(item[key])) {
      tmpSet.add(item[key]);
      tmpArr.push(item);
    }
  });

  return tmpArr;
};

export {
  getCamelizeKey,
  hasOwn,
  isEmptyItem,
  isString,
  isNativeStringType,
  _typeof,
  isEmptyArray,
  isEmptyValue,
  isEmptyObject,
  deepCloneObj,
  each,
  unique
};
