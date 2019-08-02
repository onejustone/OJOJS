import isType from './is-type';

const isDate = value => isType(value, 'Date');

export default isDate;
