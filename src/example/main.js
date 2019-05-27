import { throttle } from 'lib';
import ojo from 'lib';
// import axios from 'axios';
// import serverData from './testData';
import type from '../lib/type';

require('../style/reset.css');
require('./main.css');

function start() {
  const button = document.querySelector('#button');

  function print() {
    console.log('hello world');
  }

  const throttlePrint = ojo.energy.throttle(print, 3000);
  button.addEventListener('click', throttlePrint);
}

start();
