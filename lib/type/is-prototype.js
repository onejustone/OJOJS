const objectProto = Object.prototype;

const isPrototype = value => {
    const Ctor = value && value.constructor;
    const proto = typeof Ctor === 'function' && Ctor.prototype || objectProto;
    return value === proto;
};

export default isPrototype;
