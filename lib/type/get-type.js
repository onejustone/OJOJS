const toString = {}.toString;
const getType = (value) => toString.call(value)
    .replace(/^\[object /, '')
    .replace(/]$/, '');

export default getType;
