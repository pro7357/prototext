
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

export default () => {

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<div className={classes.composition}>
				<div className={classes.sidebar}/>
				<div className={classes.page}>
					Page
					<small>
						Consists of<br/>"content cards"
					</small>
				</div>
			</div>

			<div className={classes.composition}>
				<div className={classes.sidebar}/>
				<div className={classes.page}>
					Page 1
				</div>
				<div className={classes.page}>
					Page 2
				</div>
				<div className={classes.sidebar}/>
			</div>

			<div className={classes.composition}>
				<div className={classes.sidebar}/>
				<div className={clsx(classes.page, classes.locales)}>
					<div className={classes.locale}>
						Locale 1
						<small>original</small>
					</div>
					<div className={classes.locale}>
						Locale 2
						<small>translation</small>
					</div>
				</div>
				<div className={classes.sidebar}/>
			</div>

			<div className={classes.composition}>
				<div className={classes.page}>
					Presentation
				</div>
			</div>

			<div className={clsx(classes.composition, classes.fourColumsComposition)}>
				<div className={classes.page}>
					App<br/>settings
				</div>
				<div className={classes.page}>
					Data<br/>protection
				</div>
				<div className={classes.page}>
					Data<br/>exporting
				</div>
				<div className={classes.page}>
					User<br/>Manual
				</div>
			</div>

		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 16,
		margin: [12,0],
		minWidth: 240,
		// maxWidth: 300,
	},

	composition: {
		width: '100%',
		height: 100,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'stretch',
		gap: 8,
	},

	sidebar: {
		width: 40,
		height: '100%',
		backgroundColor: theme.background.top,
		borderRadius: 4
	},

	page: {
		flexGrow: 1,
		height: '100%',
		backgroundColor: theme.background.bottom,
		borderRadius: 4,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
		textAlign: 'center',
		'& small': {
			display: 'block',
			fontSize: 12,
			color: theme.text.muted
		}
	},

	locales: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		gap: 0,
	},

	fourColumsComposition: {
		'&>div': {
			width: '25%'
		}
	}

}),{name: 'editor-view-compositions'})