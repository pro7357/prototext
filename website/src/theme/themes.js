
// Settings from the App
import { themeIds } from 'app/theme/themes'
import appBasic from 'app/theme/basic'
import appPalette from 'app/theme/palette'
import typography from 'app/theme/typography'

// Local settings
import basic from './basic'
import palette from './palette'


export default themeIds.reduce((themes, themeId, themeIndex) => {
	return themes.concat({
		...appBasic(themeIndex),
		...basic(themeIndex),
		appPalette,
		palette,
		typography
	})
}, [])
