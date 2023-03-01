
// Settings from the App.
import { themeIds } from 'app/theme/themes'
import appBasic from 'app/theme/basic'
import appPalette from 'app/theme/palette'
import typography from 'app/theme/typography'

// Local settings.
import basic from './basic'
import palette from './palette'

// Media queries.
const breakpoints = {desktop: 960}
const isDesktop = window.innerWidth >= breakpoints.desktop
const media = breakpoint => `@media (min-width: ${breakpoint}px)`


export default themeIds.reduce((themes, themeId, themeIndex) => {
	return themes.concat({
		...appBasic(themeIndex),
		...basic(themeIndex, media(breakpoints.desktop)),
		appPalette,
		palette,
		typography,
		desktop: media(breakpoints.desktop),
		isDesktop
	})
}, [])
