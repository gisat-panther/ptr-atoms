import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import filesize from 'rollup-plugin-filesize';
import path from 'path';
import postcss from 'rollup-plugin-postcss';

const env = process.env.NODE_ENV;
const pkg = require('./package.json');

const CWD = process.cwd();
const Paths = {
	SRC: `${CWD}/src`,
	DIST: `${CWD}/dist`,
	NODE_MODULES: `${CWD}/node_modules`,
};
Object.assign(Paths, {
	INPUT: Paths.SRC + '/index.js',
	OUTPUT: Paths.DIST + '/index.js',
});

const lodashExternal = [
	'lodash/find',
	'lodash/includes',
	'lodash/reject',
	'lodash/get',
	'lodash/isObject',
	'lodash/filter',
	'lodash/isArray',
	'lodash/set',
	'lodash/forEach',
	'lodash/isEmpty',
];

export default {
	input: 'src/index.js',
	external: [
		'react-select/creatable',
		'react/jsx-runtime',
		'react',
		'prop-types',
		'classnames',
		'react-select',
		'react-select/lib/Creatable',
		'@gisatcz/ptr-utils',
		'@gisatcz/ptr-atoms',
		'@gisatcz/ptr-locales',
		'@gisatcz/ptr-core',
		'react-rnd',
		'postcss-url',
		'rollup-plugin-postcss',
		/@babel\/runtime/,
		...lodashExternal,
	],
	output: {
		file: {
			es: 'dist/index.es.js',
			cjs: pkg.main,
		}[env],
		format: env,
		globals: {
			// 'lodash/random': '_.random'
		},
		exports: 'named' /** Disable warning for default imports */,
		sourcemap: true,
	},
	plugins: [
		babel({
			plugins: ['lodash'],
			babelHelpers: 'runtime',
		}),
		commonjs({
			include: 'node_modules/**',
		}),
		postcss({
			extract: path.resolve(Paths.DIST + '/style.css'),
		}),
		json(),
		filesize(),
	],
};
