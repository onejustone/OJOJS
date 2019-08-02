import isType from './is-type';

const isRegExp = value => isType(value, 'RexExp');

export default isRegExp;
