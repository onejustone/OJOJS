import isType from './is-type';

/**
 * @param value
 * @returns {*}
 */
const isFunction = value => isType(value, 'Function');

export default isFunction;
