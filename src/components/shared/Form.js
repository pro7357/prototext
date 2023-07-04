
import { createUseStyles } from 'react-jss'
import FormHeader from './FormHeader'
import clsx from 'clsx'


export default props => {

	const {
		children: bodySections,
		title,
		primaryAction,
		secondaryActions,
		secondaryActionsForPrinting,
		scrollbarsMode,
		isNestedForm,
		className,
		titleClassName,
		sectionsClassName,
		sectionsClassNames
	} = props

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				scrollbarsMode && classes.withVisibleScrollbars,
				isNestedForm && classes.nestedRoot,
				className
			)}
		>
			<div className={classes.content}>

				{title && <FormHeader
					title={title}
					primaryAction={primaryAction}
					secondaryActions={secondaryActions}
					secondaryActionsForPrinting={secondaryActionsForPrinting}
					isNestedForm={isNestedForm}
				/>}

				<div
					className={clsx(
						classes.bodySections,
						sectionsClassName
					)}
				>
					{bodySections && Array.isArray(bodySections) ? bodySections.map((section,sectionIndex) => {
						return(
							<div
								className={clsx(
									classes.bodySection,
									sectionsClassNames && sectionsClassNames[sectionIndex]
								)}
							>
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
		...theme.draggableArea,
		width: '100%',
		height: '100vh',
		padding: 32,
		textAlign: 'center',
		overflowX: 'hidden',
		overflowY: 'scroll',
		...theme.hiddenScrollbar
	},

	nestedRoot: {
		padding: 0,
		cursor: 'default',
		height: '100%'
	},

	withVisibleScrollbars: {
		...theme.scrollbar
	},

	content: {
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