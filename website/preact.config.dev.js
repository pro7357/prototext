
const path = require('path')

const includeBaseConfig = require('./preact.config.base.js')

export default {
	webpack(config, env, helpers, options) {

		includeBaseConfig(config, false)

		config.devServer.host = 'localhost'

	}
}