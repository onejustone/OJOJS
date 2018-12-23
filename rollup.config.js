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
    format: 'cjs',
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
