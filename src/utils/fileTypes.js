
export const isImage = filePath => {
	return filePath.search(/.jpg|.jpeg|.png|.gif/gi) > -1
}

export const isVideo = filePath => {
	return filePath.search(/.webm|.mp4|.mov/gi) > -1
}

export const isAudio = filePath => {
	return filePath.search(/.mp3|.wav|.ogg/gi) > -1
}