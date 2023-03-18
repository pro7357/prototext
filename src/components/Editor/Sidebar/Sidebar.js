
import { createUseStyles } from 'react-jss'
import { useRef } from 'preact/hooks'
import clsx from 'clsx'

import Menu from './Menu'
import SidebarFooter from './SidebarFooter'
import ContentShadow from '../ContentShadow'
import scrollToNode from 'globalUtils/scrollToNode'

let prevYScrollPos = {
	left: 0,
	right: 0
}

export default props => {

	const {
		sharedEditorProps,
		targetPageIndex,
		targetLocaleIndex,
		side,
		footerContent,
	} = props

	const {
		localeConfigMode,
		dndMode,
		localizationMode,
		localeOptions,
		scrollbarsMode,
		search,
	} = sharedEditorProps

	const scrollingNode = useRef()

	const classes = useStyles()

	return (
		<div className={clsx(classes.root, classes[side+'Side'])}>

			<ContentShadow side='top' />

			<div
				className={clsx(
					classes.content,
					classes[side+'SideContent'],
					scrollbarsMode && classes.withVisibleScrollbars
				)}
				ref={node => {

					if(node && !scrollingNode.current) {
						scrollingNode.current = node
					}

					if(node) {

						if(node.scrollTop !== prevYScrollPos[side]) {
							setTimeout(() => {
								node.scroll({
									top: prevYScrollPos[side],
									behavior: 'auto'
								})
							}, 0)
						}

					}
				}}
				onScroll={e => {
					prevYScrollPos[side] = e.target.scrollTop
				}}
			>
				<Menu
					dndMode={dndMode}
					localizationMode={localizationMode}
					localeOptions={localeOptions}
					localeConfigMode={localeConfigMode}
					targetPageIndex={targetPageIndex}
					targetLocaleIndex={targetLocaleIndex}
					side={side}
					search={search}
				/>

				<SidebarFooter
					dndMode={dndMode}
					side={side}
				>
					{footerContent}
				</SidebarFooter>
			</div>

		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		...theme.draggableArea,
		width: 240,
		position: 'absolute',
		zIndex: 10,
		top: 0,
		bottom: 0,
		backgroundColor: theme.background.default,
		boxShadow: `0 0 45px ${theme.shadow.default}`,
	},

	content: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		overflowX: 'hidden',
		overflowY: 'auto',
		...theme.hiddenScrollbar
	},

	withVisibleScrollbars: {
		...theme.scrollbar
	},

	leftSide: {
		transition: 'left 150ms ease',
		left: -250,
		'&:before': {
			content: '" "',
			display: 'block',
			position: 'absolute',
			top: 0,
			right: -20,
			bottom: 0,
			width: 20,
			height: '100%'
		},
		'&:hover': {
			left: 0
		},
		'@media (min-width: 900px)':{
			'&:before': {
				display: 'none'
			},
			left: 0,
			position: 'relative'
		}
	},

	rightSide: {
		transition: 'right 150ms ease',
		right: -250,
		'&:before': {
			content: '" "',
			display: 'block',
			position: 'absolute',
			top: 0,
			left: -20,
			bottom: 0,
			width: 20,
			height: '100%'
		},
		'&:hover': {
			right: 0
		},
		'@media (min-width: 900px)':{
			'&:before': {
				display: 'none'
			},
			right: 0,
			position: 'relative'
		}
	},

	leftSideContent: {
		direction: 'rtl',
		'& > div': {
			direction: 'ltr'
		}
	},

	rightSideContent: {
		direction: 'ltr'
	},


}),{name: 'sidebar'})
