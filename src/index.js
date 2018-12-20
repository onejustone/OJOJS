// import 'dom-event' from './lib/dom-event.js'
import domEvent from "./lib/dom-event";

function start(params) {
  console.log('hello word');
  const body = document.body
  domEvent.addHandler(body, function (e) {
    console.log(e);
  })
}

start()
