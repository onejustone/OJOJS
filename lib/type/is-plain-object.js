import isObjectLike from './is-object-like';
import isType from './is-type';

/**
 * isPlainObject(new Foo) => false
 * isPlainObject([1, 2, 3]) => false
 * isPlainObject({ x: 0, y: 0 }) => true
 * isPlainObject(Object.create(null)) => true
 */
const isPlainObject = value => {
    // 在 ES5 中，如果参数不是一个对象类型，将抛出一个TypeError异常。在 ES2015 中，参数会被强制转换为一个 Object。
    if (!isObjectLike(value) || !isType(value, 'Object')) {
        return false;
    }

    // getPrototypeOf 如果没有继承属性，则返回 null
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }

    // Object.getPrototypeof(Object)  | Object.getPrototypeof(Function)
    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
};

export default isPlainObject;
