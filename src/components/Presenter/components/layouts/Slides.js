
import { useState } from 'preact/hooks'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Block from './components/Block'
import handleSlideKeyDown from './utils/handleSlideKeyDown'

export default props => {

	const {
		scrollbarsMode,
		presenterProps,
		currentDoc,
		content,
		className,
	} = props

	const [slideIndex, setSlideIndex] = useState(0)
	const slidesAmount = content && content.length

	// console.log('Slides content',content)

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				scrollbarsMode && classes.withVisibleScrollbars,
				className
			)}
			ref={node => {
				if(node) {
					let parentNode = node.parentNode
					setTimeout(() => {
						parentNode.focus()
						parentNode.onkeydown = function(e){
							handleSlideKeyDown({
								e,
								slideIndex,
								slidesAmount,
								setSlideIndex
							})
						}
					}, 0)
				}
			}}
		>
			<Block
				{...content[slideIndex]}
				presenterProps={presenterProps}
				currentDoc={currentDoc}
			/>

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
		alignItems: 'center',
		justifyContent: 'center',
		gap: 0,
		padding: 0,
		outline: 'none',
		overflowX: 'hidden',
		overflowY: 'scroll',
		...theme.hiddenScrollbar
	},


	withVisibleScrollbars: {
		...theme.scrollbar
	},


}),{name: 'presenter-slides-layout'})