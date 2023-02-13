
import { connect } from 'react-redux'
import { useState } from 'preact/hooks'

import Input from 'sharedComponents/Input'
import Button from 'sharedComponents/Button'
import UIBlock from 'sharedComponents/UIBlock'
import UIBlockLabel from 'sharedComponents/UIBlockLabel'
import UIBlockHint from 'sharedComponents/UIBlockHint'

import { setEditorState } from 'editorActions'
import { resetHistory } from 'globalActions/hystory'
import { setFilePath } from 'globalActions/filePath'
import { setEcryption } from 'globalActions/encryption'
import { setExporterState } from 'exporterActions'
import { showEditor } from 'layoutActions'
import unlockFile from '../utils/unlockFile'


export default connect(mapStateToProps)(props => {

	const {
		encryption
	} = props

	const [secretVisibility, setSecretVisibility] = useState(false)
	const [rawSecret, setRawSecret] = useState('')


	const handleSecretConfirmation = async () => {

		if(!rawSecret) {
			return
		}

		let data = await unlockFile(rawSecret.trim())

		if(!data) {
			return
		}

		if(data.editor) {
			setEditorState(data.editor, true)
			resetHistory()
		}

		if(data.exporter) {
			setExporterState(data.exporter)
		}

		if(data.filePath) {
			setFilePath(data.filePath)
		}

		setTimeout(() => {
			showEditor()
			delete data.encryption.unlockMode
			setEcryption({
				...data.encryption
			})
		}, 0)

	}


	return (
		<UIBlock
			label='Enter the secret phrase to decrypt the document content:'
			secondaryActions={
				rawSecret
				? [
					{
						label: 'Show the hidden text',
						action: () => setSecretVisibility(true)
					}
				]
				: null
			}
		>

			<Input
				value={rawSecret}
				dataType={secretVisibility ? 'text' : 'password'}
				onInput={setRawSecret}
				autoFocus={true}
				insideUIBlock
				onPressEnter={handleSecretConfirmation}
			/>

			<div>
				<Button
					onClick={handleSecretConfirmation}
					isNotable
				>
					Unlock File
				</Button>
			</div>

		</UIBlock>
	)

})


function mapStateToProps(state, props) {
	return {
		encryption: state.encryption,
	}
}