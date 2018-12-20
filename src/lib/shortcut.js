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

const getValuePropByPath = function _getValuePropByPath(obj, path, strict) {
  return getPropByPath(obj, path, strict).v;
};

function extractValue(obj, path, defaultValue = null) {
  if (!obj) return defaultValue;
  if (typeof obj === 'undefined') {
    return defaultValue;
  }
  const p = path.split('.');
  let r = obj;
  for (let i = 0; i < p.length; i += 1) {
    if (!r[p[i]]) return defaultValue;
    r = r[p[i]];
  }
  return r;
}

const deepCloneObj = function _deepCloneObj(source) {
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
  getValuePropByPath,
  getPropByPath,
  extractValue,
  deepCloneObj,
  unique
};

export default {
  resetObjectToEmpty,
  getValuePropByPath,
  getPropByPath,
  extractValue,
  deepCloneObj,
  unique
};
