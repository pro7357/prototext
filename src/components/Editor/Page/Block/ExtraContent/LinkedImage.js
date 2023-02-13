
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		src
	} = props

	const classes = useStyles()

	return (
		<div
			data-depth={5}
			className={classes.root}
			style={{
				backgroundImage: `url('${src}')`
			}}
		/>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		height: 150,
		backgroundColor: 'black',
		marginTop: 4,
		marginBottom: 12,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		// backgroundSize: 'cover',
	},

}),{name: 'linked-image'})