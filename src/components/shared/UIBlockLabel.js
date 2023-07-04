
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import TextButton from './TextButton'
import UIBlockCompactHint from './UIBlockCompactHint'


export default props => {

	const {
		children,
		hint,
		isCompact,
		secondaryActions,
		className
	} = props

	const classes = useStyles()

	return (
		<div className={clsx(
				classes.root,
				classes.complexRoot,
				isCompact && classes.compactRoot,
				className
			)}
		>
			<div className={classes.label}>
				{children}
				{hint && (
					<UIBlockCompactHint>
						{hint}
					</UIBlockCompactHint>
				)}
			</div>
			{secondaryActions && (
				<div className={classes.secondaryActions}>
					{secondaryActions.map((item, index) => {
						return (
							<TextButton
								onClick={item.action}
								isNotable
							>
								{item.label}
							</TextButton>
						)
					})}
				</div>
			)}
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		fontSize: 20,
		whiteSpace: 'nowrap',
	},

	compactRoot: {
		fontSize: 16,
	},

	complexRoot: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%'
	},

	label: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4
	},

	secondaryActions: {
		display: 'flex',
		gap: 12
	}


}),{name: 'ui-block-label'})
