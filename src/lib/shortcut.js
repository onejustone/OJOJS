import { isEmptyObject, _typeof } from './type';

function resetObjectToEmpty(targetObj) {
  if (typeof targetObj === 'undefined') return;

  const calss2Value = {
    'string': '',
    'number': null,
    'array': [],
    'object': {},
    'null': null
  };

  Object.keys(targetObj).forEach(key => {
    if (_typeof(targetObj[key]) === 'object' && !isEmptyObject(targetObj[key])) {
      resetObjectToEmpty(targetObj[key]);
    } else {
      targetObj[key] = calss2Value[_typeof(targetObj[key])];
    }
  });
}

const getPropByPath = function _getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

const extractValue = function _extractValue(obj, path, strict) {
  return getPropByPath(obj, path, strict).v;
};

const deepCloneObj = function _deepCloneObj(source) {
  // 使用 for in
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
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = _deepCloneObj(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
};

function _deepCloneObj(obj) {
  // 使用 Reflect
  const isType = (obj) => (type) => Object.prototype.toString.call(obj) === `[object ${type}]`;

  const isObject = (obj) => isType(obj)('Object');
  const isArray = (array) => isType(array)('Array');

  if (!isObject(obj)) {
    throw new Error(`${obj} is not Object`);
  }

  let newObj = isArray(obj) ? [...obj] : {...obj};
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? _deepCloneObj(obj[key]) : obj[key];
  });

  return newObj;
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
  resetObjectToEmpty,
  extractValue,
  getPropByPath,
  deepCloneObj,
  unique
};

export default {
  resetObjectToEmpty,
  getPropByPath,
  extractValue,
  deepCloneObj,
  unique
};
