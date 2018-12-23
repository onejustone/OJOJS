# OJOJS

> onejustone 的私人 `JavaScript` 武器库。

## 前言

## 使用

```bash
npm i install ojojs
```

```js
// 加载全部
import ojo from "ojojs";

function handleWindowResize () {}

handleWindowResize = ojojs.debouce(handleWindowResize, 300);
// or
handleWindowResize = ojojs.energy.debouce(handleWindowResize, 300);

// 按需加载
import { debounce } from "ojojs";

handleWindowResize = debouce(handleWindowResize, 300);

// 按需加载相应的子模块
import energy from "ojojs/energy";
handleWindowResize = energy.debouce(handleWindowResize, 300);

// 按需加载相应子模块下的函数
import { debounce } from "ojojs/energy";

handleWindowResize = debouce(handleWindowResize, 300);
```

## 项目构建概要

为了提升开发体验，目前项目同时是用来了 Webpack 4.x 和 Rollup，Webpack 主要为了方便开发时的调试，Rollup 则用于发布时打包 `bin/main.js`，Webpack 和 Rollup 的
使用请自行搜索，部分配置可参考本项目。

项目目录结构如下：

```bash
├── bin  # rollup 构建输出目录
│   └── main.js
├── build # webpack 配置文件目录
├── package.json
├── postcss.config.js # postcss 配置
├── rollup.config.js # rollup 配置文件
├── src
│   ├── example # 开发环境下 webpack 入口目录
│   │   ├── index.html
│   │   ├── main.css
│   │   └── main.js # 开发环境下 webpack 入口文件，该文件会 import 'lib/index.js'
│   └── lib # core code
│       ├── dom.js
│       ├── energy.js
│       ├── env.js
│       ├── format.js
│       ├── index.js
│       ├── operator.js
│       ├── other.js
│       ├── shortcut.js
│       ├── time.js
│       └── type.js
└── webpack.init.sh # 快速安装项目相关依赖的脚本
```

### rollup.config.js

```js
// 指定配置文件
// rollup -c build/rollup.config.js

// 添加 json 插件
import json from 'rollup-plugin-json';
// rollup-plugin-node-resolve 插件可以告诉 Rollup 如何查找外部模块
import resolve from 'rollup-plugin-node-resolve';
// 将 node_modules 中 CommonJS模块转换为 ES2015 供 Rollup 处理
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import alias from 'rollup-plugin-alias';

export default {
  input: 'src/lib/index.js',
  output: {
    file: 'bin/main.js',
    format: 'umd',
    name: 'ojo'
  },
  plugins: [
    commonjs(),
    json(),
    resolve(),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码,
      runtimeHelpers: true
    }),
    alias({
      resolve: ['.js'],
      lib: './src/lib'
    })
  ]
  // external: ['node_modules/rxjs', 'node_modules/axios'],
};
```

### webpack.init.sh

```bash
cnpm install webpack webpack-cli webpack-serve webpack-merge \
eslint eslint-config-enough eslint-loader \
@babel/cli @babel/core \
@babel/preset-env @babel/preset-stage-2 \
@babel/plugin-transform-runtime @babel/runtime \
@babel/plugin-syntax-dynamic-import \
babel-loader babel-eslint \
html-webpack-plugin html-loader \
css-loader style-loader  postcss-loader autoprefixer \
url-loader file-loader cross-env \
internal-ip clean-webpack-plugin \
rollup-plugin-alias rollup-plugin-json rollup-plugin-node-resolve \
rollup-plugin-commonjs rollup-plugin-babel --save-dev && \
cnpm install lodash --save
```

> Webpack 配置请参考项目源码，此处就不贴代码了

## dom

### catIn

`catIn` 用来判断某个目标元素是否是特定元素的后代元素。比如有一个弹窗，我们希望点击在该弹窗内点击时不做任何处理，而当点击该素之外的空白区域，比如 window 上触发了点击事件时，关闭该弹窗

```js
if (!catIn(event.target, dialogContainer))  {
  handleCloseDialog()
}
```

```js
// catIn source code
function catIn (target, parent) {
  const path = [];
  let parentNode = target;

  while (parentNode && parentNode !== document.body) {
    path.push(parentNode);
    parentNode = parentNode.parentNode;
  }

  return path.indexOf(parent) !== -1;
}
```

### popupCenterWindow

`popupCenterWindow` 可以居中打开一个非常简洁的窗口，并且使用轮询方式在该窗口关闭以后执行一个 `callback`。

```js
/// popupCenterWindow source code
function popupCenterWindow(href, title, percent = 0.8, closeCb) {
  const w = window.screen.width * percent;
  const h = window.screen.height * percent;
  const left = window.screen.width * (1 - percent) / 2;
  const top = window.screen.height * (1 - percent) / 2;
  const windowHandler = window.open(href, title, `
    toolbar=no,
    location=no,
    directories=no,
    status=no,
    menubar=no,
    scrollbars=no,
    resizable=no,
    copyhistory=no,
    width=${w},
    height=${h}, top=${top}, left=${left}`);

  if (closeCb) {
    let timer = setInterval(() => {
      if (windowHandler.closed) {
        clearInterval(timer);
        closeCb();
        timer = null;
      }
    }, 100);
  }

  return windowHandler;
}
```

## energy

## debounce

`debounce` 函数防抖，这个不多说，直接用，如有兴趣可以参考我的博文。

```js
function handleInputChange () {};
const _handleInputChange = debounce(handleInputChange, 300);
```

```js
// debounce source code
function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    const last = +new Date() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
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
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};
```

## env

`env` 检测前端设备运行环境。

```js
const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE = UA && /msie|trident/.test(UA);
const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
const isEdge = UA && UA.indexOf('edge/') > 0;
const isAndroid = (UA && UA.indexOf('android') > 0);
const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
```

## format

### formatToNumber

`formatToNumber` 用于将类数字的数值转换为数字。主要包括对逗号的处理。

```js
const numberArr = [
  123,
  123.098,
  '123',
  '123.098',
  '451,123.098',
  '34,451,123'
];

const numbers = numberArr.map(formatToNumebr);
// numbers = [123, 123.098, 123, 123.098, 451123.098, 34451123]
```

```js
// formatToNumber source code
function formatToNumebr (x) {
  if (!x) return null;

  if (typeof x === 'number') return x;

  const parts = x.toString().split('.');
  const integer = parts[0].replace(/,/g, '');
  const value = integer.concat('.', parts[1]);
  const number = parseFloat(value);
  return number;
};
```

### formartFileSize

`formartFileSize` 用于计算文件的大小，输入的原始大小按 `byte` 计算。目前最大只是计算到了 `G`。

```js
formartFileSize(Math.pow(1024, 0)); // 1.0 B
formartFileSize(Math.pow(1024, 1)); // 1.0 K
formartFileSize(Math.pow(1024, 2)); // 1.0 M
formartFileSize(Math.pow(1024, 3)); // 1.0 G
```

```js
function formartFileSize (byteSize) {
  const fileSizeUnit = ['B', 'K', 'M', 'G'];

  if (isNaN(size)) {
    throw new Error('size must be a number', 'formartFileSize');
  }

  let estimateSize = Number(size);
  let i = 0;
  let unit = '';

  if (!estimateSize) return '0B';

  while (i < 4) {
    if (Math.pow(1024, i) <= estimateSize && estimateSize < Math.pow(1024, i + 1)) {
      estimateSize = parseFloat(estimateSize / Math.pow(1024, i)).toFixed(1);
      unit = fileSizeUnit[i];
      break;
    }
    i += 1;
  }

  return `${estimateSize}${unit}`;
};
```

### prettyNumberToMoney

```js
const numberArr = [ 123, 123.098, '123', '123098', '451123.098', '34451123' ];
const prettyNumbers = numberArr.map(item => prettyNumberToMoney({ number: item }));
// ["¥123.00", "¥123.10", "¥123.00", "¥123,098.00", "¥451,123.10", "¥34,451,123.00"]
```

```js
// prettyNumberToMoney source code

function prettyNumberToMoney ({
  prefix = '¥',
  number = null,
  decimals = 2,
  decimal = '.',
  separator = ',',
  suffix = '',
} = {}) {
  let num = formatToNumebr(number);
  num = num.toFixed(decimals);
  num += '';

  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : '';

  const isNumber = value => !isNaN(parseFloat(value));

  const rgx = /(\d+)(\d{3})/;

  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
    }
  }

  return prefix + x1 + x2 + suffix;
}
```

## operator

## sum

`sum` 加法运算，支持传入单值和数组，解决浮点数计算精度问题。目前精度只精确到小数点后两位。

```js
// sum simple
0.1 + 0.2; // 0.30000000000000004
sum(0.1, 0.2); // 0.3

// sum arr
const numberArr = [ 123, 123.098, '123', '123098', '451123.098', '34451123' ];
 const numbers = numberArr.map(formatToNumebr);
 const total = sum(numbers);
 // total = 35025713.2
```

```js
// sum source code
function sum() {
  const flatArgumentsArr = flattenDeep(Array.from(arguments));
  return flatArgumentsArr.reduce((x, y) => +(+x + +y).toFixed(2));
}
```

`flattenDeep` 实现方式如下：

```js
function flattenDeep(arr1) {
  return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
```

## multipy

`multiply` 和 `sum` 是一样的。

```js
function multiply() {
  const flatArgumentsArr = flattenDeep(Array.from(arguments));
  return flatArgumentsArr.reduce((x, y) => +(+x * +y).toFixed(2));
}
```

## shortcut

### getPropByPath

```js
const targetObj = [
  {
    a: [
      {
        b: 'hello world'
      }
    ]
  }
];

const targetProp = getPropByPath(targetObj, '[0].a[0].b');
// { k: "b", o: { b: "hello world"}, v: "hello world" }
```

```js
// getPropByPath source code
function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};
```

### extractValue

`extractValue` 其实就是获取 `getPropByPath` 中 `v` 的值。

```js
const targetObj = [
  {
    a: [
      {
        b: 'hello world'
      }
    ]
  }
];

const targetValue = getPropByPath(targetObj, '[0].a[0].b');
// hello world
```

```js
// extractValue source code
function extractValue(obj, path, strict) {
  return getPropByPath(obj, path, strict).v;
};
```

### deepCloneObj

深度克隆一个对象。

```js
// deepCloneObj source code
function deepCloneObj(source) {
  if (!source) {
    return [];
  }

  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }

  const targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = _deepCloneObj(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
};
```

### resetObjectToEmpty

有时候我们想将一个对象里所有的值全部置为空，并且当 `key` 是一个 `Object` 时，递归调用该方法。

```js
const obj = {
  list: [120, 200, 340, 40],
  name: '统计数据',
  children: [],
  subData: {
    a: 'a',
    b: 'b'
  }
}

resetObjectToEmpty(obj);
// obj = {
//    children: []
//    list: []
//    name: ""
//    subData: {a: "", b: ""}
// }
```

```js
function resetObjectToEmpty(targetObj) {
  if (typeof targetObj === 'undefined') return;

  const calss2Value = {
    'string': '',
    'number': null,
    'array': [],
    'object': {},
    'null': null
  };

  Object.keys(targetObj).forEach(key => {
    if (_typeof(targetObj[key]) === 'object' && !isEmptyObject(targetObj[key])) {
      resetObjectToEmpty(targetObj[key]);
    } else {
      targetObj[key] = calss2Value[_typeof(targetObj[key])];
    }
  });
```

`_typeof` 方法请参考 `type.js`

## type

**type** 用于数据类型检测以及一些常用类型的判断。

### hasOwn

封装 `Object.hasOwnProperty` 方法。

```js
function hasOwn (obj, key) {
  return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key);
};
```

### isNumber

```js
function isNumber(value) {
  return !isNaN(parseFloat(value));
};
```

### isString

```js
function isString (value) {
  return typeof value === 'string' || value instanceof String;
};
```

### isNativeStringType

```js
function isNativeStringType (type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
};
```

### isEmptyArray

```js
function isEmptyArray (value) {
  return Array.isArray(value) && !value.length;
};
```

### isObject

```js
function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object;
};
```

### isEmptyObject

```js
function isEmptyObject (obj) {
  return Object.keys(obj).length === 0;
};
```

### isEmpty

```js
function isEmpty (value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (isEmptyArray(value)) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  if (isEmptyObject(value)) {
    return true;
  }

  return false;
};
```

### _typeof

```js
// 判断数据类型
function _typeof (obj) {
  const class2type = {};
  'Boolean String Number Array Function Object Null Date RegExp Error'.split(' ').forEach((e, i) => {
    class2type[`[object ${e}]`] = e.toLowerCase();
  });
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[class2type.toString.call(obj)]
    : typeof obj;
};

// _typeof({}) object
// _typeof([]) array
// _typeof(12345) number
// _typeof('to be or not') string
// _typeof(new Date()) date
// _typeof(function () {}) function
// _typeof(new RegExp) regexp
// _typeof(null) null
```
