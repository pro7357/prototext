
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


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
			{isExternal && (
				<svg width='18' height='18' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
					<path d='M18 13.5v6H5v-12h6m3-3h6v6m0-6-9 9' stroke-width='1.5' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round' ></path>
				</svg>
			)}

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
		'& svg': {
			display: 'inline-block',
			position: 'relative',
			top: 3,
			left: 3,
		},
		'& path': {
			stroke: theme.textButton.notable.color,
		}
	},

}),{name: 'external-link'})
