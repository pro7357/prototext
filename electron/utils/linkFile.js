
const log = require('electron-log')
const { dialog } = require('electron')
const createDir = require('./createDir')
const copyFile = require('./copyFile')
const downloadFile = require('./downloadFile')
const path = require('path')
const parseUrl = require('url').parse
const { getUUID } = require('./crpyto')
const saveFiles = require('./saveFiles')



module.exports = async (targetWindow, props) => {

	const {

		// Save linked files as attached assets (the clones with unique IDs).
		assetMode,

		// Files that was added using Drag&Drop method from OS or a web UI.
		srcFilePaths,
		srcFileUrls,

		// Files that was created from scratch in the app UI. For example, audio records.
		srcFiles,

	} = props

	log.info('linkFile srcFilePaths',srcFilePaths)
	log.info('linkFile srcFileUrls',srcFileUrls)

	let items = srcFileUrls || srcFilePaths || srcFiles

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

			const normalizedItem = srcFiles
				? item
				: srcFileUrls
					? parseUrl(item)
					: path.parse(item)

			const displayAssetName = srcFileUrls && !srcFiles
				? path.parse(normalizedItem.pathname).name
				: normalizedItem.name

			let isFileUrlProtocol = srcFileUrls && normalizedItem.protocol === 'file:'

			log.info('isFileUrlProtocol',isFileUrlProtocol)

			const convertTo = normalizedItem.convertTo

			let assetExt = srcFileUrls && !srcFiles
				? path.extname(normalizedItem.pathname)
				: convertTo || normalizedItem.ext

			if(assetExt && assetExt[0] === '.') {
				assetExt = assetExt.slice(1)
			}

			const assetFileName = getUUID()
			const assetFileBase = `${assetFileName}.${assetExt}`
			const assetFilePath = path.resolve(assetsDir,assetFileBase)
			const assetRelativeFilePath = `./assets/${assetFileBase}`

			log.info('assetFilePath',assetFilePath)

			let isOk = true

			try {
				if(srcFiles) {
					await saveFiles(
						[{
							...normalizedItem,
							name: assetFileName,
						}],
						assetsDir
					)
				} else if(srcFileUrls && !isFileUrlProtocol) {
					await downloadFile(normalizedItem, assetFilePath)
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