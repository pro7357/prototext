
require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const packageJson = require('./package.json')

module.exports = (config, isDesktopBuild) => {

	let rootDir = __dirname

	config.resolve.alias.globalConstants  = path.join(rootDir,'./src/constants/index.js')
	config.resolve.alias.globalUtils      = path.join(rootDir,'./src/utils/')
	config.resolve.alias.globalActions    = path.join(rootDir,'./src/redux/actions/')
	config.resolve.alias.store            = path.join(rootDir,'./src/redux/store.js')
	config.resolve.alias.theme            = path.join(rootDir,'./src/theme')
	config.resolve.alias.sharedComponents = path.join(rootDir,'./src/components/shared/')
	config.resolve.alias.sharedUtils      = path.join(rootDir,'./src/components/shared/utils')

	config.resolve.alias.layoutActions    = path.join(rootDir,'./src/components/layout.actions.js')

	config.resolve.alias.welcomeActions   = path.join(rootDir,'./src/components/Welcome/welcome.actions.js')
	config.resolve.alias.settingsActions  = path.join(rootDir,'./src/components/Settings/settings.actions.js')
	config.resolve.alias.settingsModels   = path.join(rootDir,'./src/components/Settings/models')

	config.resolve.alias.editorUtils      = path.join(rootDir,'./src/components/Editor/utils/')
	config.resolve.alias.editorActions    = path.join(rootDir,'./src/components/Editor/editor.actions.js')

	config.resolve.alias.topbarActions    = path.join(rootDir,'./src/components/Editor/Topbar/topbar.actions.js')

	config.resolve.alias.exporterUtils    = path.join(rootDir,'./src/components/Exporter/utils/')
	config.resolve.alias.exporterActions  = path.join(rootDir,'./src/components/Exporter/exporter.actions.js')

	config.resolve.alias.presenterUtils    = path.join(rootDir,'./src/components/Presenter/utils/')
	config.resolve.alias.presenterActions  = path.join(rootDir,'./src/components/Presenter/presenter.actions.js')

	config.plugins.push(
		new webpack.DefinePlugin({
			isDesktopBuild,
			APP_VERSION: JSON.stringify(packageJson.version)
		})
	)

}