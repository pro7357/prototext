
import requestElectronApi from 'globalUtils/requestElectronApi'
import parseFilePath from 'globalUtils/parseFilePath'
import createBlock from 'editorUtils/createBlock'
import { updBlock, addBlock} from 'editorActions'


export default async props => {

	const {
		block,
		targetPageIndex,
		targetLocaleIndex,
		targetBlockIndex,
		currentDoc,
		assetMode
	} = props

	if(assetMode && !currentDoc) {
		alert(
			'Please save the document before using this function. The assets files will be located near the current PTXT document in the "./assets" directory.'
		)
		return
	}

	let filePaths = await requestElectronApi('linkFile', assetMode)

	if(!filePaths) {
		return
	}

	if(filePaths.length === 1) {

		// update the current block.
		updBlock(
			{
				...block,
				style: 8,
				content: assetMode ? filePaths[0][1] : filePaths[0],
				link: {
					filePath: assetMode ? filePaths[0][0] : filePaths[0]
				}
			},
			true,
			targetPageIndex,
			targetLocaleIndex,
			targetBlockIndex
		)

	} else {

		// Create a series of blocks based on selected files.
		addBlock(
			filePaths.reduce((blocks, filePath, index) => {
				return blocks.concat(
					createBlock(
						assetMode ? filePath[1] : filePath,
						{
							style: 8,
							link: {
								filePath: assetMode ? filePath[0] : filePath
							}
						}
					)
				)
			},[]),
			undefined, // use position of the target block from the state
			true // replace the target block
		)

	}

}