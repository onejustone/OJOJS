// 定义所有的别名及其对应的绝对路径
const path = require('path');

const resolve = p => path.resolve(__dirname, '../', p);

module.exports = {
    lib: resolve('src/lib')
};



