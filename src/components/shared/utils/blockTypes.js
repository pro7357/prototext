
import {
	isImage,
	isVideo,
	isAudio,
} from 'globalUtils/fileTypes'

export const isTextBlock = style => !style || style < 8 || style === 9
export const isHeading = style => style === 7
export const isSubHeading = style => style === 6
export const isMuted = style => style === 5
export const isAiResponse = style => style === 9

export const isLink = style => style === 8

export const isInternalLink = link => link && link.ids

export const isWebLink = (link, content) => !link && content && content.slice(0,4) === 'http'

export const isImageWebLink = (isWebLink, content) => isWebLink && isImage(content)

export const isYouTubeVideo = (isWebLink, content) => {
	const youtubePattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/[^(user|channel)]+/i
	const isYouTube = isWebLink && youtubePattern.test(content)
	return isYouTube
}




export const isFileLink = link => link && link.filePath

export const isAssetLink = (isFileLink, link) => isFileLink && link.filePath.slice(0,8) === './assets'

export const isImageFileLink = (isFileLink, link) =>  isFileLink && isImage(link.filePath)

export const isVideoFileLink = (isFileLink, link) => isFileLink && isVideo(link.filePath)

export const isAudioFileLink = (isFileLink, link) => isFileLink && isAudio(link.filePath)

export const isTags = (content, isLink, isInternalLink, isWebLink, isFileLink) => content &&
		isLink &&
		!isInternalLink &&
		!isWebLink &&
		!isFileLink


export const recognizeAll = (style, link, content) => {

	const _isLink = isLink(style)
	const _isTextBlock = isTextBlock(style)
	const _isHeading = isHeading(style)
	const _isSubHeading = isSubHeading(style)
	const _isMuted = isMuted(style)
	const _isAiResponse = isAiResponse(style)
	const _isInternalLink = isInternalLink(link)
	const _isWebLink = isWebLink(link, content)
	const _isFileLink = isFileLink(link)
	const _isAssetLink = isAssetLink(_isFileLink, link)
	const _isImage  = isImageFileLink(_isFileLink, link)
	const _isAudioFile = isAudioFileLink(_isFileLink, link)
	const _isVideoFile = isVideoFileLink(_isFileLink, link)
	const _isYouTubeVideo = isYouTubeVideo(_isWebLink, content)
	const _isTags = isTags(
		content, _isLink, _isInternalLink, _isWebLink, _isFileLink
	)

	return {
		isLink: _isLink,
		isTextBlock: _isTextBlock,
		isHeading: _isHeading,
		isSubHeading: _isSubHeading,
		isMuted: _isMuted,
		isInternalLink: _isInternalLink,
		isWebLink: _isWebLink,
		isFileLink: _isFileLink,
		isAssetLink: _isAssetLink,
		isImage: _isImage,
		isAudioFile: _isAudioFile,
		isVideoFile: _isVideoFile,
		isYouTubeVideo: _isYouTubeVideo,
		isTags: _isTags,
		isAiResponse: _isAiResponse,
	}

}