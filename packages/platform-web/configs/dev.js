// Rollup plugins.
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import virtual_alias from 'rollup-plugin-virtual-alias';
import uglify from 'rollup-plugin-uglify'

const NODE_MODULES = process.env.NODE_MODULES || "../../node_modules"

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: "csp"
  },
  external: [
      "window",
      "document",
      "body",
      "console",
  ],
  plugins: [
    // virtual_alias({
    //     'react': `preact-compat`,
    //     'react-dom': `preact-compat`,
    //
    //}),
    babel({
      babelrc: false,
      exclude: `${NODE_MODULES}/**`,
      presets: [ [ 'es2015', { modules: false } ], 'stage-0', 'stage-1', 'react' ],
      plugins: [ 
        'external-helpers', 
      ],
      externalHelpers: false
    }),
    resolve({
      browser: true,
      main: true,
      module: true,
    }),
    cjs({
        include: [ `${NODE_MODULES}/**` ],
        exclude: [ 
          `${NODE_MODULES}/@iherb/**`
        ],
        namedExports: {
            [`${NODE_MODULES}/react-dom/index.js`]: [
                'render'
            ],
            [`${NODE_MODULES}/react/react.js`]: [
                'cloneElement', 
                'createElement', 
                'PropTypes', 
                'Children', 
                'Component' 
            ],
            [`${NODE_MODULES}/react-primitives/index.js`]: [
              'View',
              'Text',
              'StyleSheet',
              'Image'
            ],
            [`${NODE_MODULES}/immutable/dist/immutable.js`]: [
              "Set",
              "Map",
              "fromJS",
              "toJS"
            ],
            [`${NODE_MODULES}/uuid/index.js`]: [
              "v4"
            ],
            [`${NODE_MODULES}/history/index.js`]: [
              "createBrowserHistory"
            ],
        }
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
//    uglify()
  ],
  sourcemap: true
}