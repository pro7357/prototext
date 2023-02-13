
const path = require('path')
const webpack = require('webpack')

module.exports = (config, isBuild) => {

	let rootDir = __dirname

	config.resolve.alias.store      = path.join(rootDir,'./src/redux/store.js')
	config.resolve.alias.theme      = path.join(rootDir,'./src/theme')
	config.resolve.alias.components = path.join(rootDir,'./src/components')
	config.resolve.alias.utils      = path.join(rootDir,'./src/utils')

	config.resolve.alias.app = path.resolve(rootDir, '../src/')

	config.plugins.push(
		new webpack.DefinePlugin({
			isBuild,
		})
	)

}