// http://es6.ruanyifeng.com/?search=decorator&x=0&y=0#docs/decorator
// 类的继承实现 Mixin，此种方法不会污染 prototype，并且也不会覆盖父类的同名方法，因为可以调用 super
// 同时没有使用 Object.assign，自然不会触发 get 和 set 了
// const mixin = (superClass) => class extends superClass {}

/**
 * 基于 es6 extends 的动态混合继承，从右往左继承
 * @param [classItems] class Boy, class Men, class Person, class Organism
 * @returns {Class} mixins(Boy, Men, Person, Organism) => class Boy extends Men extends Person extends Organism
 */
const mixins = (...classItems) => classItems
    .reverse()
    .reduce((superClass, rightClass) => class superClass extends rightClass{}, {});

export default mixins;
