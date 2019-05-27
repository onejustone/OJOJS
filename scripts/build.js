const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const rollup = require('rollup');
const terser = require('terser');

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

let builds = require('./config').getAllBuilds();

if (process.argv[2]) {
    const filters = process.argv[2].split(',');
    builds = builds.filter(b => {
        return filters.some(f => b.output.file.indexOf(f) > 1 || b._name.indexOf(f) > -1);
    });
}

build(builds);

function build(builds) {
   let built = 0;
   const total = builds.length;
   const next = () => {
       buildEntry(builds[built]).then(() => {
           built ++;
           if (built < total) {
               next();
           }
       }).catch(logError);
   };

   next();
}

function buildEntry(config) {
    const output = config.output;
    const { file, banner } = output;
    const isProd = /(min|prod)\.js$/.test(file);
    return rollup.rollup(config)
        .then(bundle => bundle.generate(output))
        .then(({ output: [{ code }]}) => {
            if (isProd) {
                const minified = (banner ? banner + '\n' : '') + terser.minify(code, {
                    toplevel: true,
                    output: {
                        ascii_only: true
                    },
                    compress: {
                        pure_funcs: ['makeMap']
                    }
                }).code;
                return write(file, minified, true);
            } else {
                return write(file, code);
            }
        });

}

function write(dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report(extra) {
            console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''));
            resolve();
        }

        fs.writeFile(dest, code, err => {
            if (err) return reject(err);
            if (zip) {
                // 进行 gzip 压缩测试
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err);
                    report('(gzipped test ' + getSize(zipped) + ')');
                });
            } else {
                report();
            }
        });
    });
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError(error) {
   console.error(error)
}
