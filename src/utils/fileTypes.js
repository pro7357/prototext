
export const isImage = filePath => {
	return filePath.search(/.jpg|.jpeg|.png|.gif/gi) > -1
}

export const isVideo = filePath => {
	return filePath.search(/.webm|.mp4/gi) > -1
}

export const isAudio = filePath => {
	return filePath.search(/.mp3/gi) > -1
}