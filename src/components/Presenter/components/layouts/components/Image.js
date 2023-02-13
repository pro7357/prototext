
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		src,
		slideMode,
		fitImgMode,
		fullWidthImgMode,
		sharpImgMode,
	} = props

	const classes = useStyles()

	return (
		<img
			src={src}
			className={clsx(
				classes.imgRoot,
				(!slideMode && fullWidthImgMode) && classes.fullWidthInFlowMode,
				(slideMode && fitImgMode) && classes.fitImgInSlideMode,
				sharpImgMode && classes.sharp
			)}
		/>
	)

}


const useStyles = createUseStyles(theme => ({

	imgRoot: {
		width: 'fit-content',
		maxWidth: '100%',
	},

	divRoot: {
		width: '100%',
		height: '100vh',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'contain',
	},

	fullWidthInFlowMode: {
		width: '100%'
	},

	fitImgInSlideMode: {
		width: 'auto',
		maxHeight: '100vh'
	},

	sharp: {
		imageRendering: 'pixelated',
	},

}),{name: 'presenter-image'})