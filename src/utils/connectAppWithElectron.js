
import {
	showExporter,
	showHelper,
	showProtector,
	togglePresenter,
	showSettings,
} from 'layoutActions'

import {
	resetEditorState,
	setEditorState,
	switchPageView,
	toggleCompactMenuMode
} from 'editorActions'

import { toogleTopbar } from 'topbarActions'
import { setExporterState } from 'exporterActions'
import { setPresenterState } from 'presenterActions'
import { toggleTheme } from 'theme/theme.actions'
import { setFilePath, resetFilePath } from 'globalActions/filePath'
import { toggleScrollbarsMode } from 'globalActions/scrollbarsMode'
import { resetHistory } from 'globalActions/hystory'
import { toggleSpellchecker } from 'globalActions/spellcheck'
import { setEcryption, disableEncryption } from 'globalActions/encryption'
import deepClone from 'globalUtils/deepClone'
import { store } from 'store'


export default () => {

	const electronAPI = window && window.electronAPI

	if(electronAPI) {


		// Reset the app state to the original.
		electronAPI.handle('reset', (e, data) => function(e, data) {
			if (confirm('All unsaved data will be lost! Are you sure you want to start new notes from scratch?')) {
				resetEditorState()
				resetHistory()
			}
		})


		// Show the export window.
		electronAPI.handle('showExporter', (e, data) => function(e, data) {
			showExporter()
		})


		// Show the help window.
		electronAPI.handle('showHelper', (e, data) => function(e, data) {
			showHelper()
		})


		// Show the data encryption window.
		electronAPI.handle('showProtector', (e, data) => function(e, data) {
			showProtector()
		})


		// Show the app settings window.
		electronAPI.handle('showSettings', (e, data) => function(e, data) {
			showSettings()
		})


		// Finish the file opening procedure, assign a new app state along with the content.
		electronAPI.handle('open', (e, data) => function(e, data) {

			if(!data) {
				return
			}

			if(data.encryption) {
				setEcryption(data.encryption)
				if(data.encryption.unlockMode) {
					resetEditorState()
					resetHistory()
					resetFilePath()
					setTimeout(() => {
						showProtector()
					}, 0)
				}
			} else {
				disableEncryption()
			}

			if(data.editor) {
				setEditorState(data.editor, true)
				resetHistory()
			}

			if(data.exporter) {
				setExporterState(data.exporter)
			}

			if(data.presenter) {
				setPresenterState(data.presenter)
			}

			if(data.filePath) {
				setFilePath(data.filePath)
			}

		})


		// Import content, combine with the current one.
		electronAPI.handle('import', (e, data) => function(e, data) {

			if(!data) {
				return
			}

			if(data.editor) {

				let currentState = deepClone(store.getState())
				let currentEditorState = currentState.editor
				let currentEditorContent = currentEditorState.content

				setEditorState(
					{
						...currentEditorState,
						content: currentEditorContent.concat(
							data.editor.content
						)
					},
					true
				)

			}

		})


		electronAPI.handle('save', (e, data) => function(e, filePath) {

			let currentState = deepClone(store.getState())

			let reducedState = {
				editor: {
					content: currentState.editor.content,
					localeOptions: currentState.editor.localeOptions,
					pageWidth: currentState.editor.pageWidth,
					compactMenuMode: currentState.editor.compactMenuMode
				},
				exporter: currentState.exporter,
				presenter: currentState.presenter,
				encryption: currentState.encryption,
			}

			delete reducedState.exporter.selectedPages
			delete reducedState.exporter.pageSelectionToggler

			// Send a response with the current edited store state to the Electron main process to complete the save.

			setFilePath(filePath)

			electronAPI.send('completeSaving', {state: reducedState, filePath})

		})


		// Toggle the spelling check mode.
		electronAPI.handle('toggleSpellchecker', (e, data) => function(e, data) {
			toggleSpellchecker()
		})

		// Toggle theme.
		electronAPI.handle('toggleTheme', (e, data) => function(e, data) {
			toggleTheme()
		})

		// Toggle the compact viem mode of the menu in the sidbaras.
		electronAPI.handle('toggleCompactMenuMode', (e, data) => function(e, data) {
			toggleCompactMenuMode()
		})

		// Toggle the composition of the editor.
		electronAPI.handle('switchPageView', (e, data) => function(e, data) {
			switchPageView(data)
		})

		// Display the editor's topbar containing content filtering tools, etc.
		electronAPI.handle('showEditorTopbar', (e, data) => function(e, data) {
			toogleTopbar(true)
		})

		// Hide or show the scrollbars.
		electronAPI.handle('toggleScrollbarsMode', (e, data) => function(e, data) {
			toggleScrollbarsMode()
		})

		// Toggle the presentation mode.
		electronAPI.handle('togglePresenter', (e, data) => function(e, data) {
			togglePresenter()
		})

	} else {
		console.error('Unable to get access to the Electron API')
	}

}