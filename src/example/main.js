const ojo = require('../../bin/ojo.js');

function start() {
  const obj = {
    list: [120, 200, 340, 40],
    name: '统计数据',
    children: [],
    subData: {
      a: 'a',
      b: 'b'
    }
  };

  console.log(ojo._typeof({}));
  console.log(ojo._typeof([]));
  console.log(ojo._typeof(12345));
  console.log(ojo._typeof('to be or not'));
  console.log(ojo._typeof(new Date()));
  console.log(ojo._typeof(function () {}));
  console.log(ojo._typeof(new RegExp));
  console.log(ojo._typeof(null));
  console.log(ojo._typeof(null));
}

start();
