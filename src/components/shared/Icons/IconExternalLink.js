
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		className,
	} = props


	const classes = useStyles()

	return (
		<span
			className={clsx(
				classes.root,
				className
			)}
		>
			<svg
				width='18'
				height='18'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M18 13.5v6H5v-12h6m3-3h6v6m0-6-9 9' stroke-width='1.5' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round' ></path>
			</svg>
		</span>

	)

}

const useStyles = createUseStyles(theme => ({

	root: {
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

}),{name: 'icon-el'})
