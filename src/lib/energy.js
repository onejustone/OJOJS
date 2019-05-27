
// 第一次很重要
// 一段时间内，无论触发多少次 func，只执行第一次的
export function throttle (func, waitMsec) {
  let lastTime = 0; // 上一次执行的时间

  return function (...agrs) {
    const context = this;

    const currentTime = +new Date();

     // 其实该 if 判断可以没有，但是为了更严谨一些
    if (!lastTime) {
      lastTime = currentTime;
      func.apply(context, agrs);
    }

    const spaceOfTime = currentTime - lastTime; // msec

    if (spaceOfTime > waitMsec) {
      lastTime = currentTime;
      func.apply(context, agrs);
    }
  };
};

export function _debounce (func, wait) {
  let delayTimer = null;

  return function (...agrs) {
    const context = this;

    delayTimer && clearTimeout(delayTimer);

    delayTimer = setTimeout(() => {
      clearTimeout(delayTimer);
      delayTimer = null;
      func.apply(context, args);
    }, wait);
  };
};

export function enhancedThrottle(func, wait) {
  const lastTime = null;
  let delayTimer = null;

  return function (...args) {
    const context = this;
    const currentTime = +new Date();

    const spaceOfTime = currentTime - lastTime;

    if (spaceOfTime < wait) {
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    } else {
      func.apply(context, args);
    }
  };
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

export default {
  throttle,
  debounce,
};
