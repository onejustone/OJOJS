import ojo from 'lib';
import mixins from 'lib/prototype/mixins';
import { Person, Man, Boy} from './person';

require('../style/reset.css');
require('./main.css');

// const boy = new Boy('jack');

class TheBoy extends mixins(Boy, Man, Person) {
  constructor() {
    super();
  }
}

const boy = new TheBoy();

boy.sayPerson();
// boy.sayMan();
boy.sayBoy();

function start() {
  const button = document.querySelector('#button');

  function print() {
    console.log('hello world');
    ojo.format.formartFileSize(34);
  }

  const throttlePrint = ojo.energy.throttle(print, 3000);
  button.addEventListener('click', throttlePrint);
}

start();
