
import { createUseStyles } from 'react-jss'
import { useState } from 'preact/hooks'
import clsx from 'clsx'
import TextButton from 'app/components/shared/TextButton'


export default props => {

	const classes = useStyles()

	const url = 'https://forms.gle/vAkaCzPxA3muGXJv7'

	const [isOpened, setIsOpened] = useState(false)

	return (
		<div
			className={clsx(
				classes.root,
				isOpened && classes.opened
			)}
		>

			<TextButton
				isNotable
				onClick={() => {
					setIsOpened(!isOpened)
				}}
			>
				{/* {isOpened ? `Hide` : `Your thoughts, please ✍️`} */}
				{isOpened ? `Hide` : `Leave a comment ✍️`}
			</TextButton>

			{isOpened && (
				<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScqOAR18nWo6mfqRXwR6lQoaDcpApvPBE9GVEApzWBUF6DqZQ/viewform?embedded=true" width="800" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
			)}

		</div>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {
		position: 'fixed',
		zIndex: 10,
		bottom: 20,
		right: 20,
		padding: 10,
		boxShadow: `0 2px 24px ${theme.shadow.default}`,
		backgroundColor: theme.background.default,
		borderRadius: theme.rounded,
		fontSize: 12,
		overflow: 'hidden',
		[theme.desktop]: {
			fontSize: 14
		}
	},

	opened: {
		width: '100%',
		height: '100%',
		bottom: 0,
		right: 0,
		padding: [25,0],
		'& iframe': {
			width: '100%',
			maxWidth: 760,
			height: '100%',
			padding: [20, 0, 0, 0],
		},
		[theme.desktop]: {
			bottom: 20,
			right: 20,
			width: '50%',
			height: '50%',
			'& iframe': {
				padding: 0,
			},
		},
		'&>div': {
			position: 'absolute',
			top: 'initial',
			left: 'initial',
			bottom: 0,
			right: 0,
			backgroundColor: theme.background.default,
			padding: 6
		}
	}


}),{name: 'feedback'})