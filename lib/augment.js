import isFunction from './type/is-function';
import mix from './mix';

/**
 * augment c prototype
 * @param c
 * @param args
 */
const augment = (c, ...args) => {
    for (let i = 0; i < args.length; i++) {
        let obj = args[i];
        if (isFunction(obj)) {
            obj = obj.prototype;
        }

        mix(c.prototype, obj);
    }
};

export default augment;
