
import { createUseStyles } from 'react-jss'
import requestElectronApi from 'globalUtils/requestElectronApi'
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
			draggable
			data-role='image'
			onDragStart={ e => {
				e.preventDefault()
				requestElectronApi('dragImageStart',src)
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
		position: 'relative',
		overflow: 'hidden',
		textAlign: 'center',
		'& img': {
			height: '100%',
			maxWidth: '100%',
		}
	},

}),{name: 'linked-image'})