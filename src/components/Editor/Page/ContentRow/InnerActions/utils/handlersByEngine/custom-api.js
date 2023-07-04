
import request from 'globalUtils/request'
import readFileAs from 'globalUtils/readFileAs'
import normalizeFilePath from 'globalUtils/normalizeFilePath'
import sleep from 'globalUtils/sleep'
import requestElectronApi from 'globalUtils/requestElectronApi'
import createBlock from 'editorUtils/createBlock'
import basicActionManager from '../basicActionManager'


export default async props => {

	basicActionManager({
		...props,
		processData: async props => {

			// A timeout for debugging.
			// await sleep(5000)

			const {
				sharedEditorProps,
				config, // action config
				prompt, // final prompt,
				block,
				onError
			} = props

			const {
				customApiUrl,
				customApiMethod,
				customApiRequestHeaders,
				customApiRequestBody,
				customApiResponseBodyHandler,
			} = config

			let requestUrl = (customApiUrl || '').trim()
			let requestBody = (customApiRequestBody || '').trim()
			let requestHeaders
			let isFormData = requestBody[0] !== '{'


			if(requestUrl) {
				requestUrl = requestUrl
					.replaceAll(`PROMPT`, encodeURIComponent(prompt))
					.replaceAll(`ID`, encodeURIComponent(block.id))
					.replaceAll(`STYLE`, encodeURIComponent(block.style))
			}


			// Pass data from the current card to the request body.

			let cardFile = block.link && block.link.filePath

			if(cardFile && cardFile[0] === '.') {
				cardFile = normalizeFilePath(cardFile, sharedEditorProps.currentDoc)
			}

			if(isFormData) {

				// Request body is Form data
				// Example: file=FILE,model=your-model-name

				let formFields = requestBody.split(',')

				requestBody = new FormData()

				for (const formField of formFields) {
					let _formField = formField.split('=')
					let formFieldKey = _formField[0]
					let formFieldVal = _formField[1]
					if(formFieldVal === 'FILE') {
						formFieldVal = await readFileAs(cardFile)
					}
					requestBody.append(formFieldKey, formFieldVal)
				}

			} else {

				// Request body is JSON data
				// Example: { "file": FILE_BASE64, "model": "your-model-name" }

				requestBody = requestBody
					.replaceAll(`PROMPT`, prompt)
					.replaceAll(`ID`, block.id)
					.replaceAll(`STYLE`, block.style)

				if(cardFile && requestBody.indexOf(`FILE_BASE64`) > -1) {
					let cardFileBase64 = await readFileAs(cardFile, 'base64')
					requestBody = requestBody.replaceAll(`FILE_BASE64`, cardFileBase64)
				}

			}



			// Normalize the custom request headers.
			if(customApiRequestHeaders) {
				try {
					requestHeaders = JSON.parse(customApiRequestHeaders)
				} catch (error) {
					return onError(`Unable to parse the provided request headers.`)
				}
			}


			let RESPONSE_BODY = await request({
				url: requestUrl,
				method: customApiMethod,
				headers: requestHeaders,
				body: requestBody,
				isFormData
			})

			console.log('RESPONSE_BODY',RESPONSE_BODY)

			let PROMPT = prompt

			let newCards

			// Convert the response body handler string to a JavaScript array that will utilize the RESPONSE_BODY variable.
			try {

				newCards = eval('(' + customApiResponseBodyHandler + ')')

				// A demo data for debugging.
				// newCards = [
				// 	{ TEXT: 'First'},
				// 	{ TEXT: 'Second', STYLE: 1 },
				// ]

			} catch (error) {
				return onError(error.message)
			}


			// Process the empty response.
			if(!newCards || (Array.isArray(newCards) && !newCards.length)) {
				return onError('Empty response.')
			}


			// Convert API response data to standard cards.

			let newCardsNormalized = []

			for (const newCard of newCards) {

				let newCardText = String(newCard.TEXT)
				let newCardStyle = Number(newCard.STYLE)

				let filePath
				let newCardFileData = newCard.FILE
				let newCardFileExt  = newCard.FILE_EXT
				let newCardFileUrl  = newCard.FILE_URL
				let isBase64        = newCard.FILE_ENCODING === 'base64'
				let needToDownloadFileByUrl = newCard.NEED_TO_DOWNLOAD

				if(newCardFileData || (newCardFileUrl && needToDownloadFileByUrl)) {

					try {

						if(newCardFileUrl) {
							newCardFileData = await readFileAs(
								newCardFileUrl,
								'arrayBuffer'
							)
						}

						filePath = await requestElectronApi(
							'saveGeneratedAsset',
							{
								data: newCardFileData,
								ext: newCardFileExt,
								isBase64
							}
						)

						newCardStyle = 8

					} catch (error) {
						console.log('Error',error.message)
					}

					if(!filePath) {
						newCardText = 'Unable to save file.'
						newCardStyle = 1
					}

				} else if(newCardFileUrl && !needToDownloadFileByUrl) {

					// Card with an external file link.
					newCardText = newCardFileUrl
					newCardStyle = 8

				}


				newCardsNormalized.push(
					createBlock(
						newCardText,
						{
							style: newCardStyle !== undefined
								? newCardStyle
								: undefined,
							link: filePath
								? { filePath }
								: undefined,
						}
					)
				)

			}

			return newCardsNormalized

		}
	})

}