
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import Button from './Button'
import TextButton from './TextButton'


export default props => {

	const {
		title,
		primaryAction,
		secondaryActions,
		secondaryActionsForPrinting,
		isNestedForm
	} = props

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<div
				className={clsx(
					classes.title,
					isNestedForm && classes.nestedFormTitle
				)}
			>
				{title}
			</div>

			{secondaryActionsForPrinting && (
				<div className={classes.printingContent}>
					{secondaryActionsForPrinting}
				</div>
			)}

			<div className={classes.inlineBtns}>

				{secondaryActions && secondaryActions.map((secondaryAction => {
					return (
						<TextButton
							onClick={secondaryAction.action}
							isDangerous={secondaryAction.isDangerous}
							isSemiDangerous={secondaryAction.isSemiDangerous}
							isNotable={secondaryAction.isNotable}
							isDisabled={secondaryAction.isDisabled}
						>
							{secondaryAction.label}
						</TextButton>
					)
					}
				))}

				{primaryAction && (
					<Button
						onClick={primaryAction.action}
						isNotable={primaryAction.isNotable}
						isDisabled={primaryAction.isDisabled}
					>
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
		fontSize: 22,
		lineHeight: 1,
		color: theme.text.active
	},

	nestedFormTitle: {
		fontSize: 20,
		width: '100%'
	},

	inlineBtns: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 16,
		'@media print': {
			display: 'none'
		}
	},

	printingContent: {
		display: 'none',
		'@media print': {
			display: 'flex'
		}
	}


}),{name: 'form-header'})
