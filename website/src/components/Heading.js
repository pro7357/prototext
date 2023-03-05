
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		children,
		isCentred,
		isWarm,
		isCold,
		isHuge,
		className
	} = props

	const classes = useStyles()

	return (
		<h1
			className={clsx(
				classes.root,
				isCentred && classes.centred,
				(isWarm || isCold) && classes.colorful,
				isWarm && classes.warm,
				isCold && classes.cold,
				isHuge && classes.huge,
				className
			)}
		>
			{children}
		</h1>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'block',
		padding: [12,0,20,0],
		[theme.desktop]: {
			padding: [24,0,48,0],
		}
	},

	centred: {
		textAlign: 'center'
	},

	huge: {
		textTransform: 'uppercase',
		letterSpacing: '0.06em',
		fontSize: '2.5em',
		[theme.desktop]: {
			fontSize: '3.3em',
		}
	},

	colorful: {
		backgroundClip: 'text',
		textFillColor: 'transparent',
		backgroundSize: '100%',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		MozBackgroundClip: 'text',
		MozTextFillColor: 'transparent',
		display: 'inline-block'
	},

	warm: {
		backgroundImage: theme.background.warmGradient
	},

	cold: {
		backgroundImage: theme.background.coldGradient
	}


}),{name: 'heading'})