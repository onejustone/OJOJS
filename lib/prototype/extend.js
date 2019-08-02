import isFunction from '../type/is-function';
import mix from './mix';

// es6 extends 的 polyfill
const extend = function extend(subclass, superclass, overrides, staticOverrides) {
  // 如果只提供父类构造函数，则自动生成子类构造函数
  if (!isFunction(superclass)) {
    overrides = superclass;
    superclass = subclass;
    subclass = function subclass() {};
  }

  const create = Object.create ? function (proto, c) {
    return Object.create(proto, {
      constructor: {
        value: c
      }
    });
  } : function (proto, c) {
    function Tmp() {}
    Tmp.prototype = proto;
    let o = new Tmp();
    o.constructor = c;
    return o;
  };

  const superObj = create(superclass.prototype, subclass); // new superclass(),//实例化父类作为子类的prototype
  subclass.prototype = mix(superObj, subclass.prototype); // 指定子类的prototype
  subclass.superclass = create(superclass.prototype, superclass);
  mix(superObj, overrides);
  mix(subclass, staticOverrides);
  return subclass;
};

export default extend;
