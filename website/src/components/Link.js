
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import IconExternalLink from 'app/components/shared/Icons/IconExternalLink'


export default props => {

	const {
		children,
		url,
		isInternal,
		isInline,
		isNotable,
		isButton,
		isDownloadable,
		// isExternal,
		className,
	} = props

	const classes = useStyles()

	return (
		<a
			href={url}
			target={isInternal ? '_self' : '_blank'}
			download={isDownloadable}
			className={clsx(
				classes.root,
				isInline && classes.inline,
				isNotable && classes.notable,
				isButton && classes.buttonStyle,
				className
			)}
		>
			{children}
			{/* {isExternal && <IconExternalLink/>} */}
		</a>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'table',
		textDecoration: 'none',
		color: 'inherit',
		position: 'relative',
		whiteSpace: 'nowrap',
		'&:before': {
			content: '" "',
			position: 'absolute',
			zIndex: 0,
			display: 'block',
			width: '100%',
			bottom: 0,
			left: 0,
			borderBottom: `1px solid ${theme.text.default}`,
		},
		'&:hover': {
			color: theme.textButton.notable.color,
			'&:before': {
				borderColor: theme.textButton.notable.color
			},
		}
	},

	notable: {
		color: theme.textButton.notable.color,
		'&:before': {
			borderColor: theme.textButton.notable.color
		},
	},

	inline: {
		display: 'inline'
	},

	buttonStyle: {
		'&:before':{
			display: 'none'
		},
		'&:hover': {
			color: theme.textButton.notable.color,
			'&:before': {
				display: 'block',
				borderColor: theme.textButton.notable.color
			},
		}
	}

}),{name: 'link'})