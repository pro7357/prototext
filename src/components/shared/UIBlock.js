
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import UIBlockLabel from './UIBlockLabel'


export default props => {

	const {
		label,
		secondaryActions,
		children,
		isInline,
		isCompact,
		isSuperCompact,
		className
	} = props

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				isInline && classes.isInline,
				isCompact && classes.isCompact,
				isSuperCompact && classes.isSuperCompact,
				className
			)}>
				{label && (
					<UIBlockLabel secondaryActions={secondaryActions}>
						{label}
					</UIBlockLabel>
				)}
			{children}
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		cursor: 'default',
		backgroundColor: theme.block.background,
		padding: [24, 20, 28, 20],
		borderRadius: theme.rounded,
		textAlign: 'left',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 16,
		position: 'relative'
	},

	isInline: {
		height: 'auto',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	isCompact: {
		padding: [16, 20],
	},

	isSuperCompact: {
		padding: 0,
	}

}),{name: 'ui-block'})