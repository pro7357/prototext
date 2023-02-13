
const { dialog } = require('electron')
const createDir = require('./createDir')
const copyFile = require('./copyFile')
const path = require('path')
const { getUUID } = require('./crpyto')


module.exports = async (targetWindow, assetMode) => {

	let result = await dialog.showOpenDialog(targetWindow, {
		properties: ['openFile','multiSelections'],
	})

	if(
		result &&
		result.canceled === false &&
		result.filePaths && result.filePaths.length > 0
	) {

		if(assetMode) {

			const currentDocFilePath = targetWindow.filePath

			if(!currentDocFilePath) {
				return null
			}

			const assetsDir = `${path.dirname(currentDocFilePath)}/assets`

			await createDir(assetsDir)

			let relativeFilePaths = []

			for (const filePath of result.filePaths) {

				const assetFileName = `${getUUID()}${path.extname(filePath)}`
				const assetFilePath = `${assetsDir}/${assetFileName}`
				const assetRelativeFilePath = `./assets/${assetFileName}`

				await copyFile(filePath, assetFilePath)

				relativeFilePaths.push(assetRelativeFilePath)

			}

			return relativeFilePaths

		}

		return result.filePaths

	}

	return null

}