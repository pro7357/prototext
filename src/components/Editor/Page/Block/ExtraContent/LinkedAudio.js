
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Audio from 'sharedComponents/Audio'


export default props => {

	const {
		src
	} = props

	const classes = useStyles()

	return (
		<Audio
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

}),{name: 'linked-audio'})