import toString from './to-string';

const lowerFirst = value => {
    const str = toString(value);
    return str.charAt(0).toLowerCase() + str.substring(1);
};

export default lowerFirst;
