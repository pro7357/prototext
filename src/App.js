
import { store } from 'store'
import { Provider as ReduxProvider } from 'react-redux'

import { JssProvider } from 'react-jss'
import ThemeProvider from './theme/ThemeProvider'

import Layout from './components/Layout'
import connectAppToElectron from 'globalUtils/connectAppToElectron'
import checkForUpdates from 'globalUtils/checkForUpdates'
import handleAppCrash from 'globalUtils/handleAppCrash'
import { showEditor } from 'layoutActions'
import { toogleTopbar } from 'topbarActions'
import {
	deactivateAiPromptMode,
	deactivateDndMode,
	deactivateLinkMode,
	resetBlockSelection
} from 'editorActions'


export default () => {

	window.addEventListener('DOMContentLoaded', () => {

		// Connect to the Electron API, in particular to the events of the native menu.
		if(isDesktopBuild) {
			connectAppToElectron()
			checkForUpdates()
		}

		// Register some general combinations of hot keys.
		document.body.addEventListener('keydown',(e)=>{

			let keyCode = e.code

			// console.log('e',e)

			if(keyCode === 'Escape') {
				showEditor()
				toogleTopbar(false)
				deactivateAiPromptMode()
				deactivateDndMode()
				deactivateLinkMode()
				resetBlockSelection()
			}

		})

	})

	// Process unknown application errors.
	window.addEventListener('error', e => {
		handleAppCrash(e)
	})


	return (
		<ReduxProvider store={store}>
			<JssProvider classNamePrefix='app-'>
				<ThemeProvider>
					<Layout/>
				</ThemeProvider>
			</JssProvider>
		</ReduxProvider>
	)

}