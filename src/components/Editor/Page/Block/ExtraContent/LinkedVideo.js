
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Video from 'sharedComponents/Video'


export default props => {

	const {
		src
	} = props

	const classes = useStyles()

	return (
		<Video
			src={src}
			className={classes.root}
			extraProps={{'data-depth':5}}
		/>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		marginTop: 4,
		marginBottom: 12,
	},

}),{name: 'linked-video'})