
const path = require('path')
const log = require('electron-log')
const { isWindows } = require('./os')

// Convert something to something without removing the original.
module.exports = async props => {

	let {
		src,
		dst,
		srcExt,
		dstExt
	} = props

	try {

		// Convert Webm audio to MP3 by using "fluent-ffmpeg".
		if(srcExt === 'webm' && dstExt === 'mp3') {
			await convertWebmToMp3(src, dst)
		}

	} catch (error) {
		log.info('Convertation error',error && error.message)
	}

}


const convertWebmToMp3 = (src, dst) => {
	return new Promise((resolve, reject) => {

		const ffmpeg = require('fluent-ffmpeg')

		let ffmpegPath = path.join(
			__dirname,
			'./bin',
			isWindows ? 'ffmpeg.exe' : 'ffmpeg'
		)

		log.info(ffmpegPath)
		ffmpeg.setFfmpegPath(ffmpegPath)

		ffmpeg({
			source: src,
		}).on('error', (err) => {
			log.info('ffmpeg error',err.message)
			reject(err)
		}).on('end', () => {
			log.info('ffmpeg OK')
			resolve(dst)
		}).save(dst)

	})
}