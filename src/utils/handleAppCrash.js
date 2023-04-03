
import { softResetEditorState } from 'editorActions'
import {
	setFormat,
	setAllowLocales,
	setAllowBlockStyles,
	setAllowMergePages,
	setOutputFilename,
	toggleAllPagesSelection,
 } from 'exporterActions'
import prepareDataForExporting from 'exporterUtils/prepareDataForExporting'
import exportData from 'exporterUtils/exportData'
import { store } from 'store'

const message = (isEncrypted) =>
`Oh, an unexpected software error has occurred.

The app will now try to soft reset${isEncrypted?`.`:` and back up your notes to the following directory:
"~/Desktop/prototext/backups/"`}

Please report this bug to the developer https://discord.gg/zze9qE5Cvq with the details of the error:

`

export default e => {
	if(isDesktopBuild) {

		const errDesc = e && e.message

		if(errDesc && errDesc.match(/ResizeObserver|ChatGPT/g) !== null) {
			console.log(errDesc)
			return
		}

		const state = store.getState()
		const isEncrypted = state.encryption

		if(window.confirm(message(isEncrypted) + errDesc)) {

			if(isEncrypted) {
				softResetEditorState()
				return
			}

			const pages = state.editor.content

			toggleAllPagesSelection(pages, true)

			setFormat(3) // txt
			setAllowLocales(true)
			setAllowBlockStyles(true)
			setAllowMergePages(false)
			setOutputFilename('')

			setTimeout(() => {

				let files = (prepareDataForExporting() || {}).files

				if(!files) {
					return
				}

				let timeStamp = (new Date).toISOString().replace(/:|\./gi,'-').replace('T','_').slice(0,19)

				let exportingProps = {
					dst: '~/Desktop/prototext/backups/'+timeStamp,
					files
				}

				exportData(exportingProps)

				setTimeout(() => {
					softResetEditorState()
				}, 1000)

			}, 0)

		}
	}
}