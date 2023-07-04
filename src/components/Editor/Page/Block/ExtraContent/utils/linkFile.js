
import requestElectronApi from 'globalUtils/requestElectronApi'
import parseFilePath from 'globalUtils/parseFilePath'
import createBlock from 'editorUtils/createBlock'
import { updBlock, addBlock} from 'editorActions'
import { bugReportsUrl } from 'globalConstants'


export default async props => {

	const {
		block,
		targetPageIndex,
		targetLocaleIndex,
		targetBlockIndex,
		currentDoc,
		assetMode,
		srcFilePaths,
		srcFileUrls,
		srcFiles
	} = props

	const dndFileMode = srcFilePaths || srcFileUrls

	if(assetMode && !currentDoc) {
		alert(
			'Please save the document before using this function. The assets files will be located near the current PTXT document in the "assets" directory.'
		)
		return
	}


	// Create preloading blocks for files that should be uploaded using URLs.
	if(srcFileUrls) {
		addBlock(
			srcFileUrls.reduce((blocks, filePath, index) => {
				return blocks.concat(
					createBlock(
						'Uploading...',
						{
							style: 5,
						}
					)
				)
			},[]),
			targetPageIndex,
			targetBlockIndex,
			false
		)
	}


	// Option #1 – to open a dialog window to choose files.
	// Option #2 - to save files that was added using Drag&Drop method.
	let filePaths = await requestElectronApi(
		'linkFile',
		{
			assetMode,
			currentDoc,
			srcFilePaths, // files from OS
			srcFileUrls,  // files from a web UI
			srcFiles,     // files created from scratch
		}
	)

	if(!filePaths) {
		return
	}

	if(filePaths.length === 1 && !dndFileMode) {

		// Update the current block.
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

		if(srcFileUrls) {

			// Update the group of files uploaded using URLs.
			filePaths.forEach((filePath, i) => {
				updBlock(
					{
						...block,
						style: 8,
						content: filePath[1],
						link: {
							filePath: filePath[0]
						}
					},
					true,
					targetPageIndex,
					targetLocaleIndex,
					targetBlockIndex + i
				)
			})

		} else {

			// Create a new group of blocks based on selected files.
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
				targetPageIndex,
				dndFileMode
					? targetBlockIndex // insert file blocks below the target D&D position
					: undefined, // use position of the target block from the state
				dndFileMode
					? false // not replace the target block
					: true // replace the target block
			)

		}

	}

}