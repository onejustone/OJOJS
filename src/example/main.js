// import lib from 'lib'

// import {
//   addHandler,
//   preventDefault,
//   stopPropagation,
//   getWheelDelta
// } from 'lib'

// import {
//   addHandler,
//   preventDefault,
//   stopPropagation,
//   getWheelDelta
// } from 'lib/dom'

import dom from 'lib/dom';

require('./main.css');

function start(params) {
  const childrn = document.querySelector('#children');
  console.log(childrn);
  dom.addHandler(childrn, 'click', function (event) {;
    console.log(event);
  });
  dom.addHandler(childrn, 'mousewheel', function (event) {
    // FireFox浏览器，要使用DOMMouseScroll
    // dom.preventDefault(event)
    console.log(event);
    dom.stopPropagation(event);
    const wheelDelta = dom.getWheelDelta(event);
    const direction = wheelDelta > 0 ? 'up' : 'down';
    const scrollTop = event.scrollTop;
    console.log(childrn.scrollTop, 'scollTop');

    if (direction === 'up')
      console.log(wheelDelta, 'wheelDelta');
  });
}

start();
