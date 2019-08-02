import isType from './is-type';

const isError = value => isType(value, 'Error');

export default isError;
