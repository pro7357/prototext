
export const themeIds = ['Dark','Light']
import basic from './basic'
import scrollbar from './scrollbar'
import hiddenScrollbar from './hiddenScrollbar'
import textBlockHandles from './textBlockHandles'
import textBlockStyles from './textBlockStyles'
import blockBorderStyles from './blockBorderStyles'
import draggableArea from './draggableArea'
import palette from './palette'
import typography from './typography'
import os from 'globalUtils/os'


export default themeIds.reduce((themes, themeId, themeIndex) => {

	let isMac = os.isMac()
	let isWindows = os.isWindows()

	let isFrameless = isMac

	return themes.concat({
		...basic(themeIndex),
		scrollbar: scrollbar(themeIndex),
		hiddenScrollbar: hiddenScrollbar(themeIndex),
		draggableArea: draggableArea(isFrameless),
		textBlockHandles: textBlockHandles(themeIndex),
		textBlockStyles: textBlockStyles(themeIndex),
		blockBorderStyles: blockBorderStyles(themeIndex),
		palette: palette,
		typography,
		isFrameless,
		isWindows,
		isMac,
	})

}, [])
