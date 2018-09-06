import EventUtil from './utils/dom-events'

function start(params) {
  const childrn = document.querySelector('#children')
  console.log(childrn)
  EventUtil.addHandler(childrn, 'click', function (event) {
    console.log(event)
  })
  EventUtil.addHandler(childrn, 'mousewheel', function (event) {
    // FireFox浏览器，要使用DOMMouseScroll
    // EventUtil.preventDefault(event)
    console.log(event)
    EventUtil.stopPropagation(event)
    const wheelDelta = EventUtil.getWheelDelta(event)
    const direction = wheelDelta > 0 ? 'up' : 'down'
    const scrollTop = event.scrollTop
    console.log(childrn.scrollTop, 'scollTop')

    if (direction === 'up')
      console.log(wheelDelta, 'wheelDelta')
  })
}

// start()

export default start
