# OJOJS

> onejustone 的私人 `JavaScript` 武器库。

## 前言

 `EventUntil`， Cookie 操作对象 `CookieUntil` 对象，jQuery 库中 `$.ready()` 函数的实现，亦或函数柯里化的封装, Ajax 的 Promise 实现，到函数节流，数组分块，**OJOJS** 是一个超级轻量级的 `jQuery` 或者 ` lodash` 工具库，当然和这些经典强大的库比起来 `OJOJS` 只能望其项背，anyway，这算是作者 onejustone 在 JavaScript 的世界里闯荡过的痕迹吧，是经验积累，也是血泪历史，我会在我的 JavaScript 的职业生涯中不断扩充和完善该库并写上相应的代码注释或者文档说明。

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

## dom.js

## energy.js

## env.js

## format.js

## operator.js

## shortcut.js

## time.js

## type.js

## other.js
