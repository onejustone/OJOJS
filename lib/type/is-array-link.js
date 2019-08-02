const isArrayLike = value => value !== null && typeof value !== 'function' && isFinite(value.length);

export default isArrayLike;
