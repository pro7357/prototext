
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import Shortcut from './Shortcut'

export default props => {

	const {
		shortcut,
		primaryContent,
		secondaryContent,
	} = props

	let isSecondaryContentArr = Array.isArray(secondaryContent)

	const classes = useStyles()

	return (
		<div className={classes.root}>

			{shortcut && (
				<Shortcut>{shortcut}</Shortcut>
			)}

			{primaryContent && (
				<div className={classes.primaryContent}>{primaryContent}</div>
			)}

			{secondaryContent && (
				<div className={clsx(classes.secondaryContent, isSecondaryContentArr && classes.isSecondaryContentArr)}>
					{isSecondaryContentArr
						? secondaryContent.map(p => {
							return (
								<div>
									{p}
								</div>
							)
						})
						: secondaryContent
					}
				</div>
			)}

		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		gap: 3,
	},

	primaryContent: {
		// color: theme.text.active
		fontWeight: 'bold'
	},

	secondaryContent: {
		// color: theme.text.muted,
		lineHeight: 1.3,
		fontSize: 15,
	},

	isSecondaryContentArr: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		gap: 16,
	}

}),{name: 'helper-sht'})