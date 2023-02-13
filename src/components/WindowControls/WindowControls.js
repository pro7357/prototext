
import { createUseStyles } from 'react-jss'
import requestElectronApi from 'globalUtils/requestElectronApi'


export default props => {

	const classes = useStyles()

	return (
		<div
			className={classes.root}
			onMouseEnter={() => {
				requestElectronApi('toggleWindowButtons', true)
			}}
			onMouseLeave={() => {
				requestElectronApi('toggleWindowButtons', false)
			}}
		/>
	)

}


const useStyles = createUseStyles(theme => ({

	'root': {
		position: 'absolute',
		width: 56,
		height: 16,
		top: 6,
		left: 6,
		zIndex: 999
	}

}))