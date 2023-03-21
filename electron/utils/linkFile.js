
const log = require('electron-log')
const { dialog } = require('electron')
const createDir = require('./createDir')
const copyFile = require('./copyFile')
const downloadFile = require('./downloadFile')
const path = require('path')
const parseUrl = require('url').parse
const { getUUID } = require('./crpyto')


module.exports = async (targetWindow, props) => {

	const {

		// Save linked files as attached assets (the clones with unique IDs).
		assetMode,

		// Files that was added using Drag&Drop method from OS or a web UI.
		srcFilePaths,
		srcFileUrls

	} = props

	log.info('linkFile srcFilePaths',srcFilePaths)
	log.info('linkFile srcFileUrls',srcFileUrls)

	let items = srcFileUrls || srcFilePaths

	// Open the Dialog window to select files in OS.
	if(!items) {
		let selection = await dialog.showOpenDialog(targetWindow, {
			properties: ['openFile','multiSelections'],
		})
		if(selection.canceled || !selection.filePaths || !selection.filePaths.length) {
			return null
		}
		items = selection.filePaths
	}

	if(!items) {
		return null
	}

	if(assetMode) {

		const currentDocFilePath = (props.currentDoc && props.currentDoc.fullPath) ||
			(targetWindow && targetWindow.filePath)

		if(!currentDocFilePath) {
			return null
		}

		const assetsDir = path.resolve(path.dirname(currentDocFilePath), 'assets')

		log.info('assetsDir',assetsDir)

		await createDir(assetsDir)

		let relativeFilePaths = []

		for (const item of items) {

			const parsedItem = srcFileUrls
				? parseUrl(item)
				: path.parse(item)

			const displayAssetName = srcFileUrls
				? path.parse(parsedItem.pathname).name
				: parsedItem.name

			let isFileUrlProtocol = srcFileUrls && parsedItem.protocol === 'file:'

			const assetExt = srcFileUrls ? path.extname(parsedItem.pathname) : parsedItem.ext
			const assetFileName = `${getUUID()}${assetExt}`
			const assetFilePath = path.resolve(assetsDir,assetFileName)
			const assetRelativeFilePath = `./assets/${assetFileName}`

			log.info('assetFilePath',assetFilePath)

			let isOk = true

			try {
				if(srcFileUrls && !isFileUrlProtocol) {
					await downloadFile(parsedItem, assetFilePath)
				} else {
					await copyFile(
						isFileUrlProtocol ? item.slice(7) : item,
						assetFilePath
					)
				}
			} catch (error) {
				log.info('assetFilePath',error && error.message)
				isOk = false
			}

			if(isOk) {
				log.info('linkFile ok', assetRelativeFilePath, displayAssetName)
				relativeFilePaths.push(
					[assetRelativeFilePath, displayAssetName]
				)
			}

		}

		return relativeFilePaths.length
			? relativeFilePaths
			: null

	}

	return items && items.length
		? items
		: null

}