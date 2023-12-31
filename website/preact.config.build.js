
const includeBaseConfig = require('./preact.config.base.js')

const { npm_lifecycle_event } = process.env

export default {
	webpack(config, env, helpers, options) {

		const npmScriptName = npm_lifecycle_event.split(':')
		const isBuild = npmScriptName.includes('build')

		includeBaseConfig(config, isBuild)

		config.output.filename = `[name].js?v=${(new Date()).getTime()}`
		config.output.publicPath = ''

	}
}