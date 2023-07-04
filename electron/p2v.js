
const path = require('path')
const log = require('electron-log')
// const { isWindows } = require('./os')
// const readFile = require('./utils/readFile')
const isFileExists = require('./utils/isExists')
const createDirectory = require('./utils/createDir')
const ffmpeg = require('fluent-ffmpeg')
const sharp = require('sharp')


const renderVideo = (props) => {
	return new Promise(async (resolve, reject) => {

		const { content, sourceDir, outputVideoFilePath } = props

		const convertedAssetsDir = path.join(sourceDir, 'convertedAssets')
		await createDirectory(convertedAssetsDir)

		const ffmpegPath = path.join(__dirname, './utils/bin/ffmpeg')
		ffmpeg.setFfmpegPath(ffmpegPath)

		const command = ffmpeg()

		let trackNumber = 0
		let videoInputs = ''
		let numVideoInputs = 0
		let audioInputs = ''
		let numAudioInputs = 0

		for (const card of content) {

			const {
				id,
				content,
				type,
				style,
				link
			} = card

			if (type.isFileLink) {
				const inputFile = path.resolve(sourceDir, link.filePath)

				if (!(await isFileExists(inputFile))) {
					log.info('File does not exist', inputFile)
					continue
				}

				if (type.isAudioFile) {

					command.input(inputFile)

					audioInputs += `[${trackNumber}:a]`
					trackNumber++
					numAudioInputs++

					continue

				}

				if (type.isImage) {

					const convertedAssetExt = 'jpg'

					const convertedAsset = path.join(
						convertedAssetsDir,
						`${id}.${convertedAssetExt}`
					)

					await processImage(inputFile, convertedAsset)

					command.input(convertedAsset).loop().inputOptions('-t 3')

					videoInputs += `[${trackNumber}:v]`
					trackNumber++
					numVideoInputs++

					continue

					}
			}

		}

		command
		.complexFilter([
			`${videoInputs}concat=n=${numVideoInputs}:v=1:a=0[outv]`,
			`${audioInputs}concat=n=${numAudioInputs}:a=1:v=0[outa]`
		])
		.outputOptions([
			'-map [outv]',
			'-map [outa]',
			'-c:v libx264',
			'-c:a aac',
			'-pix_fmt yuv420p',
			'-s 1920x1080'
		])
		.output(outputVideoFilePath)
		.on('error', (err) => {
			log.info(err.message)
			reject(err)
		})
		.on('progress', function (progress) {
			log.info('progress')
		})
		.on('end', () => {
			log.info('Concatenation complete!')
		})
		.run()

	})
}

const run = async () => {

	const sourceDir = '../_p2v'
	const content = require('../_p2v/content')
	const outputVideoFilePath = `${sourceDir}/output.mp4`

	try {
		await renderVideo({
			content,
			sourceDir,
			outputVideoFilePath,
		})
	} catch (error) {
		log.info(error.message)
	}

}


const processImage = async (inputPath, outputPath) => {
	await sharp(inputPath)
	.jpeg({
		quality: 100,
	})
	.resize({ width: 1920, height: 1080 })
	.toColourspace('srgb')
	.toFile(outputPath)
}


run()