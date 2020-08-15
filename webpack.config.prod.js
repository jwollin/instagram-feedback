const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
	mode: 'production',
	entry: './client/index.js',
	output: {
			path: path.join(__dirname, 'dist/client'),
			filename: 'bundle.js',
	},
});
