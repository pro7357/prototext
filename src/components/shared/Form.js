
import { createUseStyles } from 'react-jss'
import FormHeader from './FormHeader'
import clsx from 'clsx'


export default props => {

	const {
		children: bodySections,
		title,
		primaryAction,
		secondaryActions,
		scrollbarsMode,
		className,
		sectionsClassName
	} = props

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				scrollbarsMode && classes.withVisibleScrollbars,
				className
			)}
		>
			<div className={classes.form}>

				<FormHeader
					title={title}
					primaryAction={primaryAction}
					secondaryActions={secondaryActions}
				/>

				<div
					className={clsx(
						classes.bodySections,
						sectionsClassName
					)}
				>
					{bodySections && Array.isArray(bodySections) ? bodySections.map((section,sectionIndex) => {
						return(
							<div className={classes.bodySection}>
								{section}
							</div>
						)
					}): bodySections}
				</div>

			</div>
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'drag',
		cursor: 'grab',
		width: '100%',
		height: '100vh',
		padding: 32,
		textAlign: 'center',
		overflowX: 'hidden',
		overflowY: 'scroll',
		...theme.hiddenScrollbar
	},

	withVisibleScrollbars: {
		...theme.scrollbar
	},

	form: {
		minHeight: '100%',
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'center',
		gap: 16
	},

	bodySections: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexGrow: 1,
		alignItems: 'stretch',
		justifyContent: 'stretch',
		gap: 16
	},

	bodySection: {
		width: '100%',
		// margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'stretch',
		gap: 16,
		'& > div': {
			'&:last-child': {
				height: '100%',
			}
		}
	},


}),{name: 'form'})