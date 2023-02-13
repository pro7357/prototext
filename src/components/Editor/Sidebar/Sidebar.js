
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
		<div className={classes.root}>

			<ContentShadow side='top' />

			<div
				className={clsx(
					classes.content,
					classes[side+'Side'],
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
		'-webkit-app-region': 'drag',
		cursor: isDesktopBuild ? 'grab' : 'default',
		width: 240,
		position: 'relative',
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
		direction: 'rtl',
		'& > div': {
			direction: 'ltr'
		}
	},

	rightSide: {
		direction: 'ltr'
	},


}),{name: 'sidebar'})
