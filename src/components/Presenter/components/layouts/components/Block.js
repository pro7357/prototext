
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import normalizeFilePath from 'globalUtils/normalizeFilePath'
import Image from './Image'
import Video from 'sharedComponents/Video'
import Audio from 'sharedComponents/Audio'


export default props => {

	const {
		blockIndex,
		presenterProps,
		currentDoc,
		content,
		style,
		link,
		type,
	} = props

	const {
		fitImgMode,
		fullWidthImgMode,
		sharpImgMode,
		slideMode,
	} = presenterProps

	if(!content && !link) {
		return null
	}

	const {
		isTextBlock,
		isFileLink,
		isImage,
		isAudioFile,
		isVideoFile,
		isYouTubeVideo,
		isInternalLink,
		isWebLink,
		isTags,
		isBrokenLink
	} = type

	let filePath

	if(isFileLink) {
		filePath = normalizeFilePath(link.filePath, currentDoc)
	}

	const classes = useStyles(presenterProps)

	return (
		<div
			className={clsx(
				classes.root,
				slideMode && classes.slideMode,
				(isImage && slideMode) && classes.gridMode
			)}
		>

			{isImage && (
				<Image
					src={filePath}
					slideMode={slideMode}
					fitImgMode={fitImgMode}
					fullWidthImgMode={fullWidthImgMode}
					sharpImgMode={sharpImgMode}
				/>
			)}

			{isAudioFile && (
				<Audio
					src={filePath}
					//className={classes.root}
				/>
			)}

			{(isVideoFile || isYouTubeVideo) && (
				<Video
					src={isYouTubeVideo ? content : filePath}
					isYouTube={isYouTubeVideo}
					isFullHeigth
				/>
			)}

			{(isTextBlock || isWebLink) && (
				<div
					className={clsx(
						classes.textBlock,
						style && classes['textBlockStyle-'+style],
					)}
				>
					{content}
				</div>
			)}

			{isBrokenLink && (
				<div
					className={clsx(
						classes.textBlock,
						classes.brokenLink,
					)}
				>
					{content}
				</div>
			)}

		</div>
	)


}


const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
		outline: 'none',
	},

	slideMode: {
		height: '100vh',
		justifyContent: 'center',
		'& $textBlock': {
			marginTop: -24,
		},
		'& $textBlockStyle-6': {
			textAlign: 'center'
		},
		'& $textBlockStyle-7': {
			textAlign: 'center'
		}
	},

	gridMode:{
		display: 'grid'
	},

	textBlock: props =>({
		maxWidth: `${props.textWidthLimit}%`,
		fontSize: props.textNormalSize
	}),

	// Sub heading
	'textBlockStyle-6': props => ({
		fontWeight: theme.typography.weights.bold,
		fontSize: props.textSubheadingSize,
		marginTop: 20,
	}),

	// Heading
	'textBlockStyle-7': props => ({
		fontWeight: theme.typography.weights.bold,
		fontSize: props.textHeadingSize,
	}),

	brokenLink: {
		color: 'red'
	},

}),{name: 'presenter-block'})