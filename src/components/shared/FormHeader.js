
import { createUseStyles } from 'react-jss'

import Button from './Button'
import TextButton from './TextButton'


export default props => {

	const {
		title,
		primaryAction,
		secondaryActions
	} = props

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<div className={classes.title}>
				{title}
			</div>

			<div className={classes.inlineBtns}>

				{secondaryActions && secondaryActions.map((secondaryAction => {
					return (
						<TextButton
							onClick={secondaryAction.action}
							isDangerous={secondaryAction.isDangerous}
							isSemiDangerous={secondaryAction.isSemiDangerous}
							isNotable={secondaryAction.isNotable}
						>
							{secondaryAction.label}
						</TextButton>
					)
					}
				))}

				{primaryAction && (
					<Button onClick={primaryAction.action}>
						{primaryAction.label}
					</Button>
				)}


			</div>

		</div>
	)
}



const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 16
	},

	title: {
		fontSize: 21,
		lineHeight: 1,
		color: theme.text.active
	},

	inlineBtns: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 16
	},


}),{name: 'exporter-header'})
