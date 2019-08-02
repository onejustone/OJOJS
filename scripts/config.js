const path = require('path');
const buble = require('rollup-plugin-buble');
// const babel = require('rollup-plugin-babel');
const alias = require('rollup-plugin-alias');
const replace = require('rollup-plugin-replace');
const node = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const version = process.env.VERSION || require('../package.json').version;

const banner =
  '/*!\n' +
  ` * ojo.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} onejustone\n` +
  ' * Released under the MIT License.\n' +
  ' */';

const aliases = require('./alias');

const resolve = p => {
   const base = p.split('/')[0];
   if (aliases[base]) {
      return path.resolve(aliases[base], p.slice(base.length + 1));
   } else {
      return path.resolve(__dirname, '../', p);
   }
};

const builds = {
   'web-full-dev': {
      entry: resolve('lib/index.js'),
      dest: resolve('bin/ojo.js'),
      format: 'umd',
      env: 'development',
      plugins: [node(), commonjs()],
      banner
   },
   'web-full-prod': {
      entry: resolve('lib/index.js'),
      dest: resolve('bin/ojo.min.js'),
      format: 'umd',
      env: 'production',
      plugins: [node(), commonjs()],
      banner
   }
};

function genConfig(name) {
   const opts = builds[name];
   const config = {
      input: opts.entry,
      external: opts.external,
      plugins: [
          alias(Object.assign({}, aliases, opts.alias))
      ].concat(opts.plugins || []),
      output: {
         file: opts.dest,
         format: opts.format,
         banner: opts.banner,
         name: opts.moduleName || 'ojo',
         // https://github.com/rollup/rollup/issues/2106
         exports: 'named',
      },
   };

   // build-in vars
   const vars = {
      __VERSION__: version
   };

  if (opts.env) {
     vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }

  config.plugins.push(replace(vars));

  if (opts.transpile !== false) {
     config.plugins.push(buble());
  }

  Object.defineProperty(config, '_name', {
     enumerable: false,
     value: name
  });

  return config;
}

if (process.env.TARGET) {
   module.exports = genConfig((process.env.TARGET));
} else {
   exports.getBuild = genConfig;
   exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
}

