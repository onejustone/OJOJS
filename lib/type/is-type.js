// const _typeof = function (obj) {
//     const class2type = {};
//     'Boolean String Number Array Function Object Null Date RegExp Error'.split(' ').forEach((e, i) => {
//         class2type[`[object ${e}]`] = e.toLowerCase();
//     });
//     return typeof obj === 'object' || typeof obj === 'function'
//         ? class2type[class2type.toString.call(obj)]
//         : typeof obj;
// };

/**
 * 判断数据类型
 * @type {string}: Boolean String Number Array Function Object Null Date RegExp Error Arguments Undefined
*/

const toString = {}.toString;
const isType = (value, type) => toString.call(value) === `[object ${type}]`;

export default isType;
