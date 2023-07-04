
import { isMac } from 'globalUtils/os'
import requestElectronApi from 'globalUtils/requestElectronApi'
import { readFileAsBase64 } from 'globalUtils/readFileAs'
import getTimestamp from 'globalUtils/getTimestamp'
import linkFile from './linkFile'
import { lsGet, lsSet } from 'globalUtils/ls'

let isRecording = false
let mediaRecorder = null
let audioChunks = []


export default async props => {

	const {
		e,
		block,
		pageIndex,
		localeIndex,
		blockIndex,
		currentDoc,
	} = props

	if(isMac()) {
		if(!lsGet('micAccessIsRequested')) {
			await requestElectronApi('askForMicAccess')
			lsSet('micAccessIsRequested', true)
		}
	}

	const node = e.target

	if (!isRecording) {

		navigator.mediaDevices.getUserMedia({ audio: true })
		.then(stream => {

			mediaRecorder = new MediaRecorder(stream)

			mediaRecorder.addEventListener('dataavailable', event => {
				if (event.data.size > 0) {
					audioChunks.push(event.data)
				}
			})

			mediaRecorder.addEventListener('stop', async () => {

				const audioBlob = new Blob(audioChunks, { type: 'audio/webm; codecs=opus' })
				const audioBase64 = await readFileAsBase64(audioBlob, true)

				linkFile({
					block,
					targetPageIndex: pageIndex,
					targetLocaleIndex: localeIndex,
					targetBlockIndex: blockIndex,
					currentDoc,
					assetMode: true,
					srcFiles: [{
						name: `Recording – ${getTimestamp(true)}`,
						data: audioBase64,
						encoding: 'base64',
						ext: 'webm',
						convertTo: 'mp3',
					}]
				})

				audioChunks = []
				mediaRecorder = null

			})

			mediaRecorder.start()
			isRecording = true
			node.innerText = 'Stop recording'
			node.style.color = 'red'

		})
		.catch(error => {
			console.error('Error accessing microphone:', error)
		})
	} else {
		mediaRecorder.stop()
		isRecording = false
	}

}