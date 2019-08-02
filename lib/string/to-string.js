import isNil from "../type/is-nil";

const toString = str => {
    if (isNil(str)) return '';
    return str.toString;
};

export default toString;
