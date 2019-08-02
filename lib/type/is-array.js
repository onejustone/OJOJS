import isType from './is-type';

const isArray = Array.isArray ? Array.isArray(value) : isType(value, 'Array');

export default isArray;
