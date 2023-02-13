
export const themeIds = ['Dark','Light']
import basic from './basic'
import scrollbar from './scrollbar'
import hiddenScrollbar from './hiddenScrollbar'
import textBlockHandles from './textBlockHandles'
import textBlockStyles from './textBlockStyles'
import blockBorderStyles from './blockBorderStyles'
import palette from './palette'
import typography from './typography'


export default themeIds.reduce((themes, themeId, themeIndex) => {
	return themes.concat({
		...basic(themeIndex),
		scrollbar: scrollbar(themeIndex),
		hiddenScrollbar: hiddenScrollbar(themeIndex),
		textBlockHandles: textBlockHandles(themeIndex),
		textBlockStyles: textBlockStyles(themeIndex),
		blockBorderStyles: blockBorderStyles(themeIndex),
		palette: palette,
		typography
	})
}, [])
