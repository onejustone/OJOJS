import toString from './to-string';

const upperFirst = (value) => {
    const str = toString(value);
    return str.charAt(0).toUpperCase() + str.substring(1);
};

export default upperFirst;
