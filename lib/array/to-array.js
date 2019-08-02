import isArrayLike from '../type/is-array-link';

const toArray = (value) => isArrayLike(value) ? [...value] : [];

export default toArray;
