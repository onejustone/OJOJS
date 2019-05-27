import ojo from 'lib';
// import axios from 'axios';
// import serverData from './testData';
import type from '../lib/type';

require('../style/reset.css');
require('./main.css');

function start() {
  const button = document.querySelector('#button');
  console.log(button);

  function print() {
    console.log(type._typeof(true));
    console.log('hello world');
  }

  const throttlePrint = ojo.throttle(print, 3000);
  button.addEventListener('click', throttlePrint);
}

start();
