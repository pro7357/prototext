
import { connect } from 'react-redux'
import { useState } from 'preact/hooks'

import Input from 'sharedComponents/Input'
import Button from 'sharedComponents/Button'
import TextButton from 'sharedComponents/TextButton'
import UIBlock from 'sharedComponents/UIBlock'
import UIBlockLabel from 'sharedComponents/UIBlockLabel'
import UIBlockHint from 'sharedComponents/UIBlockHint'

import requestSecretHash from '../utils/requestSecretHash'

import { setSecretKey, disableEncryption } from 'globalActions/encryption'


export default connect(mapStateToProps)(props => {

	const {
		isProtected
	} = props

	const [secretVisibility, setSecretVisibility] = useState(false)
	const [rawSecret, setRawSecret] = useState(['',''])


	const handleRawSecretInput = (value, fieldIndex) => {
		setRawSecret(rawSecret.reduce((done, cur, index)=>{
			return done.concat(
				fieldIndex === index
					? value
					: cur
			)
		},[]))
	}

	const handleSecretConfirmation = async () => {

		if(!rawSecret[0] || !rawSecret[1]) {
			alert('Error. Secret phrases are incorrect.')
			return
		}

		if(rawSecret[0] !== rawSecret[1]) {
			alert('Error. Secret phrases are not identical.')
			return
		}

		let secretKey = await requestSecretHash(rawSecret[0].trim())

		setSecretKey(secretKey)

	}


	return (
		<UIBlock
			label={<b>
				Currently this document is {isProtected ? 'protected 🔒' : 'not protected'}
			</b>}
			secondaryActions={
				rawSecret[0] || rawSecret[1]
				? [
					{
						label: 'Show the hidden text',
						action: () => setSecretVisibility(true)
					}
				]
				: null
			}
		>


			<UIBlockLabel>
				{isProtected ? 'New secret phrase' : 'Secret phrase'}:
			</UIBlockLabel>

			<Input
				value={rawSecret[0]}
				onInput={(value) => handleRawSecretInput(value, 0)}
				autoFocus={true}
				insideUIBlock
				dataType={secretVisibility ? 'text' : 'password'}
			/>

			<UIBlockLabel>
				Repeat the secret phrase:
			</UIBlockLabel>

			<Input
				value={rawSecret[1]}
				onInput={(value) => handleRawSecretInput(value, 1)}
				insideUIBlock
				dataType={secretVisibility ? 'text' : 'password'}
			/>

			<UIBlockHint isNormal>
				Please note, if you forget this phrase, then you will not be able to decrypt the contents of the document ⚠️
			</UIBlockHint>

			<div style={{marginTop: 10}}>
				<Button
					onClick={handleSecretConfirmation}
					isDangerous
				>
					{isProtected ? 'Update' : 'Confirm'}
				</Button>
			</div>

			{isProtected && (
				<div>
					<TextButton
						onClick={disableEncryption}
						isNotable
					>
						Disable Protection
					</TextButton>
				</div>
			)}


		</UIBlock>
	)

})


function mapStateToProps(state, props) {
	return {
		isProtected: state.encryption && (
			state.encryption.secretKey || state.encryption.controlHash
		)
	}
}