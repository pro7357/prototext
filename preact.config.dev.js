
const webpack = require('webpack')
const includeBaseConfig = require('./preact.config.base.js')

export default {
	webpack(config, env, helpers, options) {

		includeBaseConfig(config, false)

		config.devServer.proxy = [
			{
				path: '/api',
				target: 'http://localhost:3334/'
			}
		]

		config.devServer.host = 'localhost'
		// config.devServer.port = 3333

		config.plugins.push(
			new webpack.DefinePlugin({
				DEV_OPENAI_API_KEY: JSON.stringify(process.env.OPENAI_API_KEY)
			})
		)

	}
}