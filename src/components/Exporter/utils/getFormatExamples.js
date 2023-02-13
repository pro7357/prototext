
import codingOptions from './codingOptions'
import textOptions from './textOptions'

const coding = (id,q,prefix) => codingOptions[id](q,prefix)

const plainText = (id, mdFormat) => textOptions[id](mdFormat)

const propsToOptionId = (wl,ws,mp) => `${Number(wl)}-${Number(ws)}-${Number(mp)}`


export default {

	json: (wl, ws, mp) => coding(
		propsToOptionId(wl, ws, mp), `"`, ``
	),

	js: (wl, ws, mp) => coding(
		propsToOptionId(wl, ws, mp), `"`, `<violet>export default </violet>`
	),

	md: (wl, ws, mp) => plainText(
		propsToOptionId(wl, ws, mp), true
	),

	txt:  (wl, ws, mp) => plainText(
		propsToOptionId(wl, ws, mp), false
	),

	// htm

}