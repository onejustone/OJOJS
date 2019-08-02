import isType from './is-type';

const isArguments = function isArguments(value) {
  return isType(value, 'Arguments');
};

export default isArguments;
