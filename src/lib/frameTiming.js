//
// https://www.cnblogs.com/coco1s/p/8029582.html
const rAF = function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
}();

class FrameTime {
  constructor () {
    this.frame = 0;
    this.allFrameCount = 0;
    this.lastTime = Date.now();
    this.lastFameTime = Date.now();
    this.enableListening = true;
  }

  start () {
    this.enableListening = true;
    this.loop();
  }

  end () {
    this.enableListening = false;
  }

  loop () {
    const self = this;
    const now = Date.now();
    const fs = (now - self.lastFameTime);
    let fps = Math.round(1000 / fs);

    self.lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    self.allFrameCount++;
    self.frame++;

    if (now > 1000 + self.lastTime) {
      fps = Math.round((self.frame * 1000) / (now - self.lastTime));
      console.log(`${new Date()} 1S内 FPS：`, fps);
      self.frame = 0;
      self.lastTime = now;
    };

    self.enableListening && rAF(self.loop.bind(self));
  }
}
