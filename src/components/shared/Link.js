
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import IconExternalLink from './Icons/IconExternalLink'


export default props => {

	const {
		children: content,
		onClick,
		isExternal,
		url,
		className,
		extraProps = {},
	} = props


	const classes = useStyles()

	return (
		<span
			className={clsx(
				classes.root,
				className
			)}
			onClick={e => {
				if(onClick) {
					onClick(e)
				} else {
					if(url) {
						window.open(url, '_blank')
					}
				}
			}}
			{...extraProps}
		>
			{content}
			{isExternal && <IconExternalLink/>}

		</span>

	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		textDecoration: 'underline',
		font: 'inherit',
		fontSize: 'inherit',
		color: theme.textButton.notable.color,
		display: 'inline-block',
		cursor: 'pointer',
	},

}),{name: 'external-link'})
