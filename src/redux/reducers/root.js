
import { combineReducers } from 'redux'

import theme from 'theme/theme.reducer'
import layout from '../../components/layout.reducer'
import editor from '../../components/Editor/editor.reducer'
import presenter from '../../components/Presenter/presenter.reducer'
import exporter from '../../components/Exporter/exporter.reducer'
import settings from '../../components/Settings/settings.reducer'
import scrollbarsMode from './scrollbarsMode'
import spellcheck from './spellcheck'
import fbbMode from './fbbMode'
import history from './history'
import updates from './updates'
import filePath from './filePath'
import topbar from '../../components/Editor/Topbar/topbar.reducer'
import encryption from './encryption'

export default combineReducers({

	// User settings that are required to be stored in the local storage.
	theme,
	fbbMode,
	scrollbarsMode,
	spellcheck,

	// The first level wrapper for components: Editor, Exporter, and etc.
	layout,

	// Content and everything else that relates to the text editor.
	editor,
	topbar,

	// Presentation of content and its settings.
	presenter,

	// A tool for data export.
	exporter,

	// App settings that usually should be kept in the browser memory.
	settings,

	// The number of available steps for the "undo" function.
	history,

	// Absolute address of the working .ptxt document
	filePath,

	// Document encryption settings.
	encryption,

	// App Updates info.
	updates,

})