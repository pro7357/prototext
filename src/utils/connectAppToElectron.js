
import {
	showWelcome,
	showEditor,
	showExporter,
	showHelper,
	showProtector,
	togglePresenter,
	showSettings,
} from 'layoutActions'

import { addRecentDoc, setRecentDocs } from 'welcomeActions'
import setSettingsProperty from 'settingsActions'

import {
	resetEditorState,
	setEditorState,
	switchPageView,
	toggleCompactMenuMode
} from 'editorActions'

import { toogleTopbar } from 'topbarActions'
import { setExporterState } from 'exporterActions'
import reExportData from 'exporterUtils/reExportData'
import { setPresenterState } from 'presenterActions'
import { toggleTheme } from 'theme/theme.actions'
import { setFilePath, resetFilePath } from 'globalActions/filePath'
import { toggleScrollbarsMode } from 'globalActions/scrollbarsMode'
import { resetHistory } from 'globalActions/hystory'
import { toggleSpellchecker } from 'globalActions/spellcheck'
import { setEcryption, disableEncryption } from 'globalActions/encryption'
import deepClone from 'globalUtils/deepClone'
import prepareStateToSave from 'globalUtils/prepareStateToSave'
import { store, undo } from 'store'


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


		// Show the welcome window.
		electronAPI.handle('showWelcome', (e, data) => function(e, data) {
			showWelcome()
		})


		// Show the export window.
		electronAPI.handle('showExporter', (e, data) => function(e, data) {
			showExporter()
		})


		// Repeat the data exporting with previous settings.
		electronAPI.handle('reExportData', (e, data) => function(e, data) {
			reExportData()
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


			if(!data.encryption || !data.encryption.unlockMode) {
				showEditor()
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
				addRecentDoc(data.filePath)
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


		electronAPI.handle('save', (e, data) => function(e, payload) {

			const {
				filePath,
				lastSaving
			} = payload

			const reducedState = prepareStateToSave()

			// Send a response with the current edited store state to the Electron main process to complete the save.

			setFilePath(filePath)

			electronAPI.send(
				'completeSaving',
				{
					state: reducedState,
					lastSaving,
					filePath
				}
			)

			addRecentDoc(filePath)

		})


		// Toggle the auto-save documents mode.
		electronAPI.handle('toggleAutoSaveMode', (e, data) => function(e, value) {
			setSettingsProperty('autoSaveMode', value)
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

		// Undo a major document change.
		electronAPI.handle('docUndo', (e, data) => function(e, data) {
			undo()
		})


	} else {
		console.error('Unable to get access to the Electron API')
	}

}