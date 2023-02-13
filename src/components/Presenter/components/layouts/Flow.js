
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Block from './components/Block'

export default props => {

	const {
		scrollbarsMode,
		presenterProps,
		currentDoc,
		content,
		className,
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
				{content && content.map((block, blockIndex) => {
					return (
						<Block
							{...block}
							blockIndex={blockIndex}
							presenterProps={presenterProps}
							currentDoc={currentDoc}
						/>
					)
				})}

		</div>
	)


}



const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		flexGrow: 1,
		width: 'calc(100% - 280px)',
		height: '100vh',
		flexDirection: 'column',
		gap: 24,
		padding: 60,
		outline: 'none',
		overflowX: 'hidden',
		overflowY: 'scroll',
		...theme.hiddenScrollbar
	},

	withVisibleScrollbars: {
		...theme.scrollbar
	},


}),{name: 'presenter-flow-layout'})