
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import TextButton from './TextButton'


export default props => {

	const {
		children,
		secondaryActions,
		className
	} = props

	const classes = useStyles()

	return (
		<div className={clsx(classes.root, classes.complexLabel, className)}>
			<div>{children}</div>
			{secondaryActions && (
				<div>
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

	complexLabel: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%'
	},


}),{name: 'ui-block-label'})
