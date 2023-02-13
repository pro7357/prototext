
const includeBaseConfig = require('./preact.config.base.js')
const fsPromises = require('fs').promises

const { npm_lifecycle_event } = process.env

export default {
	webpack(config, env, helpers, options) {

		const npmScriptName = npm_lifecycle_event.split(':')
		const isDesktopBuild = npmScriptName.includes('desktop')

		includeBaseConfig(config, isDesktopBuild)

		config.output.filename = '[name].js'
		config.output.publicPath = ''

		fsPromises.copyFile('./src/constants/index.js', './electron/constants/index.js')

	}
}