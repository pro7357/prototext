
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		src,
		isEmbedded,
		isYouTube,
		isFullHeigth,
		className,
		extraProps = {},
	} = props

	const classes = useStyles()

	if(isEmbedded || isYouTube) {

		let videoURL

		try {
			videoURL = new URL(src)
		} catch (e) {
			console.log(e.message)
		}

		if(!videoURL) {
			return 'Broken video'
		}

		let iframeSrc = src

		if(isYouTube) {

			const videoID = videoURL.host === 'youtu.be'
				? videoURL.pathname.slice(1)
				: videoURL.searchParams.get('v')

			iframeSrc = `https://www.youtube.com/embed/${videoID}?mute=0`

		}

		return (
			<iframe
				className={clsx(
					classes.iframeRoot,
					isFullHeigth && classes.fullHeigth,
					className
				)}
				src={iframeSrc}
				frameborder='0'
				allowfullscreen
				{...extraProps}
			/>
		)

	} else {

		let codec = 'webm'

		return (
			<video
				className={clsx(
					classes.videoRoot,
					isFullHeigth && classes.fullHeigth,
					className
				)}
				//poster={poster ? IMG_DIR+poster : null}
				//width={width}
				controls={true}
				autoplay={false}
				loop={false}
				{...extraProps}
			>
				<source src={src} type={`video/${codec}`} />
			</video>
		)

	}

}

const useStyles = createUseStyles(theme => ({

	videoRoot: {
		width: '100%',
		height: 150,
		backgroundColor: 'black',
		outline: 'none'
	},

	iframeRoot: {
		width: '100%',
		height: 150,
		backgroundColor: 'black',
		outline: 'none'
	},

	fullHeigth: {
		height: '100vh'
	}

}),{name: 'video'})