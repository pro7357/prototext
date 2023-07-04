
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import PrimaryControls from './PrimaryControls'


export default props => {

	const {
		scrollbarsMode,
		presenterProps,
		editorProps,
	} = props

	const isActive = presenterProps.sidebarMode
	const withShadow = !presenterProps.contrastDarkMode

	const classes = useStyles()

	return (
		<div className={clsx(
			classes.root,
			isActive && classes.active,
			withShadow && classes.withShadow
		)}>

			<div className={clsx(
				classes.content,
				scrollbarsMode && classes.withVisibleScrollbars
			)}>

				{isActive && <>

					<PrimaryControls
						scrollbarsMode={scrollbarsMode}
						presenterProps={presenterProps}
						editorProps={editorProps}
					/>

				</>}

			</div>

		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'drag',
		cursor: theme.isFrameless ? 'grab' : 'default',
		position: 'relative',
		zIndex: 2,
		backgroundColor: theme.background.default,
		fontSize: 16,
	},

	active: {
		width: 280,
		padding: 24,
	},

	withShadow: {
		boxShadow: `0 0 45px ${theme.shadow.default}`,
	},

	content: {
		width: '100%',
		height: '100%',
		display: 'flex',
		gap: 20,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		overflowX: 'hidden',
		overflowY: 'auto',
		...theme.hiddenScrollbar
	},

	withVisibleScrollbars: {
		...theme.scrollbar
	},

}),{name: 'presenter-sidebar'})
