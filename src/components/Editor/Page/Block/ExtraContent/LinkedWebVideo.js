
import { createUseStyles } from 'react-jss'
import Video from 'sharedComponents/Video'


export default props => {

	const {
		src,
		isYouTube,
	} = props

	const classes = useStyles()

	return (
		<Video
			src={src}
			className={classes.root}
			extraProps={{'data-depth':5}}
			isEmbedded
			isYouTube={isYouTube}
		/>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		marginTop: 4,
		marginBottom: 12,
	},

}),{name: 'linked-embedded-video'})