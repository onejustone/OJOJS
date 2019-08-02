import isArray from './type/is-array';
import isObject from './type/is-object';

const each = (elements, func) => {
    if (!elements) return;

    let res = null;

    if (isArray(elements)) {
        const len = elements.length;
        for (let i = 0; i < len; i++) {
            const res = func(elements[i], i);
            if (res === false) {
                break;
            }
        }
        return;
    }

    if (isObject(elements)) {
        for (let key in elements) {
            if (elements.hasOwnProperty(elements[key])) {
                res = func(elements[key], key);
                if (res === false) {
                    break;
                }
            }
        }
    }
};

export default each;
