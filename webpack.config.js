const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: './dist',
		compress: true,
		port: 9000
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Client clock',
			template: './src/index.html'
		}),
	],
};