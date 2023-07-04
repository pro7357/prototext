
import { useState } from 'preact/hooks'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import TextButton from 'sharedComponents/TextButton'
import Block from './components/Block'
import handleSlideKeyDown from './utils/handleSlideKeyDown'

export default props => {

	const {
		scrollbarsMode,
		presenterProps,
		currentDoc,
		content,
		targetBlockIndex,
		className,
	} = props

	const [slideIndex, setSlideIndex] = useState(targetBlockIndex || 0)
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

			{/* <div className={classes.controls}>
				<TextButton
					isNotable
					onClick={(e) => {
						handleSlideKeyDown({
							e: {
								key: 'ArrowLeft'
							},
							slideIndex,
							slidesAmount,
							setSlideIndex
						})
					}}
				>
					←
				</TextButton>
				<TextButton
					isNotable
					onClick={(e) => {
						handleSlideKeyDown({
							e: {
								key: 'ArrowRight'
							},
							slideIndex,
							slidesAmount,
							setSlideIndex
						})
					}}
				>
					→
				</TextButton>
			</div> */}

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
		...theme.hiddenScrollbar,
		'&:hover': {
			'& $controls': {
				display: 'flex'
			}
		}
	},


	withVisibleScrollbars: {
		...theme.scrollbar
	},

	// controls: {
	// 	position: 'fixed',
	// 	display: 'none',
	// 	bottom: 24,
	// 	right: 20,
	// 	gap: 4,
	// 	'&>div': {
	// 		backgroundColor: theme.button.glass.background,
	// 		padding: [2,6],
	// 		borderRadius: theme.rounded
	// 	}
	// },


}),{name: 'presenter-slides-layout'})