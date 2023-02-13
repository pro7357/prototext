
export const isImage = filePath => {
	return filePath.search(/.jpg|.jpeg|.png|.gif/gi) > -1
}

export const isVideo = filePath => {
	return filePath.search(/.webm|.mp4/gi) > -1
}