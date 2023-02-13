

import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import TextButton from 'app/components/shared/TextButton'
import Section from './Section'


export default props => {

	const {
		title,
		onClose,
		isOpened,
		children
	} = props

	if(!isOpened) {
		return null
	}

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
			)}
		>
			<div className={classes.lockScreen} onClick={onClose}/>

			<div
				className={clsx(
					classes.content,
				)}
			>

				<div className={classes.topbar}>
					<h2 className={classes.title}>{title}</h2>
					<TextButton isNotable onClick={onClose} >
						Close
					</TextButton>
				</div>

				{children}

			</div>

		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		position: 'fixed',
		zIndex: 3,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 60,
		backgroundColor: theme.background.lockScreen,
	},

	lockScreen: {
		position: 'absolute',
		zIndex: 0,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		height: '100%',
		cursor: 'pointer'
	},

	content: {
		display: 'flex',
		position: 'relative',
		zIndex: 1,
		width: '100%',
		padding: [24, 42, 48, 42],
		flexDirection: 'column',
		backgroundColor: theme.background.default,
		borderRadius: theme.rounded,
		textAlign: 'left',
		overflowY: 'auto',
		overflowX: 'hidden',
		maxHeight: '100%'
	},

	topbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	title: {
		margin: [16,0,16,0],
	}


}),{name: 'modal'})