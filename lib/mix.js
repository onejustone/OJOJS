// es6 Object.assign 的 Polyfill
// 该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter
// 如果合并源包含getter，这可能使其不适合将新属性合并到原型中。
// 为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty()

function _mix(dist, obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
            dist[key] = obj[key];
        }
    }
}

const mix = function mix(dist, src1, src2, src3) {
    if (src1) _mix(dist, src1);
    if (src2) _mix(dist, src2);
    if (src3) _mix(dist, src3);
    return dist;
};

export default mix;

